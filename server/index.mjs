import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import data from "./routes/data.mjs";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(bodyParser.json())

// Load the /posts routes
app.use("/data", data);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});