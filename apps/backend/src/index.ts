import startServer from "./librairies/express";
import connectDB from "./librairies/mongodb/db";
import services from "./librairies/mongodb/services";

startServer(connectDB, services)
