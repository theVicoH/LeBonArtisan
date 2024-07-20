import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

config({ path: "../../.env" });

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

const port = process.env.EXPRESS_PORT || 3000;

const startServer = async (db: () => Promise<void>) => {
  try {
    await db();
    app.get("/", (req, res) => {
      res.send("Hello, world!");
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default startServer;
