const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./helpers/db");
const financialRecordRouter = require("./routes/records-routes");

// Configure dotenv
require("dotenv").config();

// Create an Express app
const app = express();

// handle cross origin request responses
app.use(cors());

// set up a middleware to run on every api request to parse json request bodies
app.use(express.json());

// Log app name from environment variables
const appName = process.env.APP_NAME;
console.log(`APP NAME IS :::: ${appName}`);

// Connect to the database
connectToDatabase();

// call the routers on given endpoint
app.use("/api/financial-records", financialRecordRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
