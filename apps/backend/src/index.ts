import startServer from "./librairies/express";
import connectDB from "./librairies/mongodb/db";

startServer(connectDB)
