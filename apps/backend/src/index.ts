import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "../../.env" });

const app = express();
const port = process.env.EXPRESS_PORT || 3000;
console.log(process.env.BACKEND_PORT);

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://vicoh:vicoh@cluster0.zjgtlhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
