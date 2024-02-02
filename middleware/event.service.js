const Event = require("../models/event.model");

class eventService {
  static async storeEvent(
    userId,
    title,
    location,
    date,
    category,
    ticketsNum,
    price,
    description
  ) {
    const storeEvent = new Event({
      userId,
      title,
      location,
      date,
      category,
      ticketsNum,
      price,
      description,
    });
    return await storeEvent.save();
  }
  static async getAllEvents(userId = null) {
    let events;
    if (userId) {
      events = await Event.find({ userId });
    } else {
      events = await Event.find({});
    }
    return events;
  }
}

module.exports = eventService;
