// jshint esversion:6
const {
  existslaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
} = require("../../models/launches.model.js");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  let launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(401).json({ error: "Missing launch property" });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(401).json({ error: "Incorrect Date property" });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchID = Number(req.params.id);

  if (!existslaunchWithId(launchID))
    return res.status(404).json({
      error: `Launch with id: ${launchID} not found!`,
    });

  const aborted = abortLaunch(launchID);

  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
