import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const app = express();
const port = process.env.BACKEND_PORT || 3000;
console.log(process.env.BACKEND_PORT)

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
