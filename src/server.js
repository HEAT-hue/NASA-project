// jshint esversion:6

// Import Node Http Builtin Object to create server
const http = require("http");

// Import Express App object.
const app = require("./app");

// Load planet data
const { loadPlanetData } = require("./models/planets.model.js");

// Register current env PORT
const PORT = process.env.PORT || 6000;

// Create server
const server = http.createServer(app);

// Using IIFE - Immediately invoked function expression
// Wait for data to load before listening for requests
(async function startServer() {
  await loadPlanetData();

  // Listen for connections
  server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
})();
