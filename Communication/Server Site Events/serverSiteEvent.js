import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();
const port = process.env.port || 5111;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");

  // when using SSE each data string must be sent using data: prefix and \n\n as suffix
  res.write(`data: Welcome to Server Site Event \n\n`);
  let interval = setInterval(() => {
    // when using SSE each data string must be sent using data: prefix and \n\n as suffix
    res.write(`data: Server Time ${new Date().toLocaleTimeString()} \n\n`);
  }, 3000);

  req.on("close", () => {
    clearInterval(interval);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
