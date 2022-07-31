// jshint esversion:6

// Use the Map data structure to store list of different launches
const launches = new Map();

// keep track of flight number
let latestFlightNumber = 100;

// A sample launch data
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Exploration IS1",
  launchDate: new Date("July 17, 2030"),
  target: "Kepler-442_b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// Push data to data structure
launches.set(launch.flightNumber, launch);

// Check if launch exist with given Id
function existslaunchWithId(launchID){
  return launches.has(launchID);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

// Add a new launch
function addNewLaunch(launch) {
  latestFlightNumber++;

  // Update Launch object
  Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  });

  // Set the launch
  launches.set(launch.flightNumber, launch);

  return launch;
}

function abortLaunch(launchID){
  const launch = launches.get(launchID);
  launch.success = false;
  launch.upcoming = false;
  return launch;
}

// Export data structure
module.exports = {
  existslaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunch
};
