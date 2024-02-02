const eventService = require("../middleware/event.service");

exports.createEvent = async (req, res, next) => {
  try {
    const {
      userId,
      title,
      location,
      date,
      category,
      ticketsNum,
      price,
      description,
    } = req.body;
    let event = await eventService.storeEvent(
      userId,
      title,
      location,
      date,
      category,
      ticketsNum,
      price,
      description
    );

    res.status(200).json({
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred!",
      error,
    });
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const events = await eventService.getAllEvents(userId); // pass userId to getAllEvents method
    res.status(200).json({
      statusCode: 200,
      message: "Getting events",
      events,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "An error occurred!",
      error,
    });
  }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();
    res.json({ status: true, events });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred!",
      error,
    });
  }
};
