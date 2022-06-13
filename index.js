const express = require("express");

const app = express();
app.use(express.json());

const flavours = [
  { id: 1, name: "chicken", country: "multiple" },
  { id: 2, name: "miso", country: "japan" },
  { id: 3, name: "kimchi", country: "korea" },
  { id: 4, name: "pho", country: "vietnam" },
];

app.get("/", (req, res) => {
  res.send("Welcome to the Noodles API");
});

app.get("/api/noodles", (req, res) => {
  //   console.log(req.query);
  if (req.query.country) {
    const filteredFlavours = flavours.filter(
      (flavour) => flavour.country === req.query.country
    );
    res.send(filteredFlavours);
  } else {
    res.send(flavours);
  }
});

// ? query string parameters

app.get("/api/noodles/:id", (req, res) => {
  //   console.log(req.params); // URL parameters

  const flavour = flavours.find((x) => x.id === Number(req.params.id));

  if (flavour) {
    res.send(flavour);
  } else {
    res.status(404).send("We do not have that flavour in stock...");
  }
});

app.post("/api/noodles", (req, res) => {
  console.log(req.body);

  const newFlavour = {
    id: flavours.length + 1,
    name: req.body.name,
    country: req.body.country,
  };

  flavours.push(newFlavour);

  res.status(201).send(newFlavour);
});

app.get("*", (req, res) => {
  res.redirect("/");
});

app.delete("/api/noodles/:id", (req, res) => {
  // 1. Check if the resource exists
  // 1.a ==> if the resource does not exist; tell the user
  // 2.b ==> remove the resource from the array
  // 2. Send back to the user the deleted resource

  const targetFlavour = flavours.find(
    (flavour) => flavour.id === Number(req.params.id)
  );

  if (!targetFlavour) {
    return res.status(404).send("No such flavour!");
  }

  const targetIndex = flavours.indexOf(targetFlavour);
  flavours.splice(targetIndex, 1);

  res.send(targetFlavour);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
