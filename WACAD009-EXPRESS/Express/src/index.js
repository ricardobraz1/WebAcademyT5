const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3344;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT};`);
});
