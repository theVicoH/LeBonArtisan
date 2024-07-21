import express from "express"
import { config } from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import http from "http"
import createProductRouter from "./routes/productRoutes"
import { IServices } from "common/types"
import connectDB from "mongodb/db"
import services from "mongodb/services"
import ProductWebSocket from "socket/index"

config({ path: "../../.env" })

const app = express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
)

const port = process.env.EXPRESS_PORT || 3000

const startServer = async (db: () => Promise<void>, services: IServices) => {
  try {
    await db()

    app.use("/product", createProductRouter(services))

    app.get("/", (req, res) => {
      res.send("Hello, world!")
    })

    new ProductWebSocket(server, services);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer(connectDB, services)
