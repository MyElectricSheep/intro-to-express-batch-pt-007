const express = require("express");
const flavours = require("../data/flavours");
const noodlesRouter = express.Router();

noodlesRouter.get("/", (req, res) => {
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

noodlesRouter.get("/:id", (req, res) => {
  //   console.log(req.params); // URL parameters

  const flavour = flavours.find((x) => x.id === Number(req.params.id));

  if (flavour) {
    res.send(flavour);
  } else {
    res.status(404).send("We do not have that flavour in stock...");
  }
});

noodlesRouter.post("/", (req, res) => {
  console.log(req.body);

  const newFlavour = {
    id: flavours.length + 1,
    name: req.body.name,
    country: req.body.country,
  };

  flavours.push(newFlavour);

  res.status(201).send(newFlavour);
});

noodlesRouter.delete("/:id", (req, res) => {
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

noodlesRouter.put("/:id", (req, res) => {
  const targetFlavour = flavours.find(
    (flavour) => flavour.id === Number(req.params.id)
  );

  if (!targetFlavour) {
    return res.status(404).send("No such flavour!");
  }

  targetFlavour.name = req.body.name || targetFlavour.name;
  targetFlavour.country = req.body.country || targetFlavour.country;

  res.send(targetFlavour);
});

noodlesRouter.patch("/:id", (req, res) => {
  const targetFlavour = flavours.find(
    (flavour) => flavour.id === Number(req.params.id)
  );

  if (!targetFlavour) {
    return res.status(404).send("No such flavour!");
  }

  targetFlavour[req.body.property] = req.body.value;

  res.send(targetFlavour);
});

module.exports = noodlesRouter;
