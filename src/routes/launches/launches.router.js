// jshint esversion:6
const express = require("express");

/* Import controllers to hadnel different requests */
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

const router = express.Router();

router.get("/", httpGetAllLaunches);

router.post("/", httpAddNewLaunch);

router.delete("/:id", httpAbortLaunch);

module.exports = router;
