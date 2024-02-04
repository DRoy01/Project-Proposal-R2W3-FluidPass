const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
const dbConfig = require("./config/database");
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
// const userRoutes = require("./routes/user");
// const eventRoutes = require("./routes/event");
// const walletRoutes = require("./routes/wallet");
// const verificationRoutes = require("./routes/verification");
// const ticketRoutes = require("./routes/ticket");
// const transactionRoutes = require("./routes/transaction");

// app.use("/user", userRoutes);
// app.use("/event", eventRoutes);
// app.use("/wallet", walletRoutes);
// app.use("/verification", verificationRoutes);
// app.use("/ticket", ticketRoutes);
// app.use("/transaction", transactionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
