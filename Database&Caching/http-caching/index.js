import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();

const PORT = 5111;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use((req, res, next) => {
  // res.setHeader("Cache-Control", "public, max-age=86400");
  // or
  //res.setHeader("Expires", "Fri, 01 May 2026 20:20:00 GMT");
  next();
});

app.use(
  express.static(join(__dirname, "public"), {
    // etag , lastModified if default behaviour of express , can be changed
    // by below boolean value
    etag: true, // a tag is generated based on the resource if the resource is not changes the tag remains inpact and caching happens
    cacheControl: false,
    lastModified: false,
  }),
);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
