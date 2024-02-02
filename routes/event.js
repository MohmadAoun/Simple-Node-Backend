const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.post("/storeEvent", eventController.createEvent);
router.post("/getEvents", eventController.getEvents);
router.post("/getAllEvents", eventController.getAllEvents);

module.exports = router;
