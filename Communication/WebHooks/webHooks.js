import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();

const PORT = 5111;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// webhook endpoint from where the request will come
app.post("/webHooks", (req, res) => {
  const payload = req.body;

  // log the payload (you might want to do additional item like authentication, process any activity)
  console.log("received WebHook Payload:", payload);

  // optionally sent the response to the server fro acknowledgement
  res.status(200).send("WebHook received successfully");
});

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
