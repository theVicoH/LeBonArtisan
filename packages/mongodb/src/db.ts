import mongoose from "mongoose"
import ProductModel from "./models/productModel"
import initialProducts from "./mock/data"

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI
  try {
    if (!mongoURI) {
      throw new Error("No mongoURI provided in environment variables")
    }
    await mongoose.connect(mongoURI)

    const count = await ProductModel.countDocuments()
    if (count === 0) {
      await ProductModel.insertMany(initialProducts)
      console.log("Initial data inserted")
    } else {
      console.log("Data already present in the database")
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Connection error:", err.message)
    } else {
      console.error("Unknown connection error")
    }
    process.exit(1)
  }
}

export default connectDB

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB")
})
