import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.port || 5111;
const alllowedOrigin = ["http://127.0.0.1:5500/Security/CORs/client/"];

const corsOptions = {
  origin: function (origin, cb) {
    if (alllowedOrigin.indexOf(origin) !== 1 || origin) {
      cb(null, true);
    } else {
      cl(new Error("CORs error"));
    }
  },
};
// by using this options we allowing the url
// check response header:
// access-control-allow-origin: http://127.0.0.1:5500

app.use(cors(corsOptions));

app.get("/list", (req, res) => {
  res.send([
    {
      firstname: "Arham",
      lastName: "Chowdhry",
    },
  ]);
});

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
