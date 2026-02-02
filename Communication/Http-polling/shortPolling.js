const express = require("express");
const app = express();
const port = process.env.port || 5111;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/shortPolling.html");
});

let data = {
  value: "Initial Data",
};

app.get("/getData", (req, res) => {
  res.send(data);
});

app.get("/updateData", (req, res) => {
  data.value = "Updated Data";
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
