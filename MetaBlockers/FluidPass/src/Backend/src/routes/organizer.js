const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Organizer = require("../models/Organizer");

// Function to generate JWT token
const generateToken = (organizer) => {
  const payload = {
    id: organizer._id,
    username: organizer.username,
    email: organizer.email,
  };

  const options = {
    expiresIn: "1h", // Token expiration time (adjust as needed)
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Register new organizer
router.post("/register", async (req, res) => {
  try {
    const { username, password, email, organizationName } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newOrganizer = new Organizer({
      username,
      password: hashedPassword,
      email,
      organizationName,
    });

    const savedOrganizer = await newOrganizer.save();

    res.status(201).json(savedOrganizer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login organizer
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the organizer by username
    const organizer = await Organizer.findOne({ username });

    if (!organizer) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, organizer.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(organizer);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Request verification for organizer
router.post("/request-verification", async (req, res) => {
  try {
    // Assuming you have an authentication middleware to identify the organizer
    const organizerId = req.organizerId;

    const organizer = await Organizer.findById(organizerId);

    if (!organizer) {
      return res.status(404).json({ error: "Organizer not found" });
    }

    // Assuming you have a verification request mechanism
    organizer.verificationStatus = false; // Set to false initially
    await organizer.save();

    res.status(200).json({ message: "Verification request sent" });
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

    // Assuming you have the event details in the request body
    const eventDetails = {
      eventName: req.body.eventName,
      eventDetails: req.body.eventDetails,
      date: req.body.date,
      location: req.body.location,
      totalTickets: req.body.totalTickets,
    };

    // Find the organizer by organizerId
    const organizer = await Organizer.findById(organizerId);

    if (!organizer) {
      return res.status(404).json({ error: "Organizer not found" });
    }

    // Push the event ID to the organizer's events array
    organizer.events.push(eventDetails);

    // Save the updated organizer to the database
    await organizer.save();

    res.status(201).json(organizer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all events organized by the organizer
router.get("/events", async (req, res) => {
  try {
    // Assuming you have an authentication middleware to identify the organizer
    const organizerId = req.organizerId;

    // Find the organizer by organizerId with populated events
    const organizer = await Organizer.findById(organizerId).populate("events");

    if (!organizer) {
      return res.status(404).json({ error: "Organizer not found" });
    }

    res.status(200).json(organizer.events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
