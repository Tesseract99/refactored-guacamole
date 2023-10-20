const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Anti Fragile");
});

app.listen(3001);
