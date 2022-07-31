// jshint esversion:6
const path = require("path");
const planetsRouter = require("./routes/planets/planets.router.js");
const launchesRouter = require("./routes/launches/launches.router.js");

const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const app = express();

app.use(
  // Specify origin to allow access to resources
  cors({
    origin: "http://localhost:3000",
  })
);

// Log requests
app.use(morgan("combined"));

// Parse JSON data
app.use(express.json());

// Serve the static files
app.use(express.static(path.join(__dirname, "..", "public")));

// Route all requests to their route handlers
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;