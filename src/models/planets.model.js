// jshint esversion:6
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

// Store Planet data
let habitablePlanets = [];

// Check if planet is habitable
const isPlanetHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

// Async code
// Create a readStream to read data from file and pipe it to a writable Stream.
function loadPlanetData() {
  // return a new promise | resolved or rejected
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "../", "../", "data", "kepler_data.csv"),
      { encoding: "utf-8" }
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isPlanetHabitable(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log("An error has occured");
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = {
  loadPlanetData,
  getAllPlanets,
};
