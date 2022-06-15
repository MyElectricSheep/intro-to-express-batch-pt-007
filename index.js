const express = require("express");
const noodlesRouter = require("./routes/noodlesRouter");

const app = express();
app.use(express.json());
app.use("/api/noodles", noodlesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Noodles API");
});

app.get("*", (req, res) => {
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
