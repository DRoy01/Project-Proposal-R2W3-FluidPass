const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Organizer verification and event creation
// router.post("/add-event", async (req, res) => {
//   try {
//     // Assuming you have an authentication middleware to identify the organizer
//     const organizerId = req.organizerId;

//     // Create a new event with the provided details
//     const newEvent = new Event({
//       eventName: req.body.eventName,
//       eventDetails: req.body.eventDetails,
//       date: req.body.date,
//       location: req.body.location,
//       totalTickets: req.body.totalTickets,
//       organizer: organizerId,
//     });

//     // Save the event to the database
//     const savedEvent = await newEvent.save();

//     res.status(201).json(savedEvent);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Get all events listed
router.get("/", async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get event details by eventId
router.get("/:eventId", async (req, res) => {
  try {
    // Fetch the event by eventId from the database
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Organizer verification and event creation
router.post("/add-event", async (req, res) => {
  try {
    // Assuming you have an authentication middleware to identify the organizer
    const organizerId = req.organizerId;

    // Create a new event with the provided details
    const newEvent = new Event({
      eventName: req.body.eventName,
      eventDetails: req.body.eventDetails,
      date: req.body.date,
      location: req.body.location,
      totalTickets: req.body.totalTickets,
      organizer: organizerId,
    });

    // Save the event to the database
    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
