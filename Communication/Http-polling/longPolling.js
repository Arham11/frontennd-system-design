const express = require("express");
const app = express();
const port = process.env.port || 5111;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/longPolling.html");
});

let data = "Initial Data";

const waitingClientList = [];

app.get("/getData", (req, res) => {
  if (data !== req.query.lastData) {
    res.json({ data });
  } else {
    waitingClientList.push(res);
  }
});

// this update can happen from server or database or another user on messaging app
app.get("/updateData", (req, res) => {
  data = req.query.data;
  while (waitingClientList.length > 0) {
    const client = waitingClientList.pop();
    client.json({ data });
  }
  res.send({ success: "data Updated Successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
