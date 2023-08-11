const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleWare");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ msg: "Welcome to Api" });
});
// User Routes

app.use("/api/user", require("./routes/userRoutes"));

// Ticket Routes

app.use("/api/ticket", require("./routes/ticketRoutes"));

// Error Handler

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Sever is Running at Port : ${PORT}`);
});
