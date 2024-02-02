const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AuthRoute = require("./routes/auth");
const eventRoute = require("./routes/event");

mongoose.connect("mongodb://127.0.0.1:27017/shoufiBokra");

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database Connection Established!");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

app.use("/api", AuthRoute);
app.use("/api", eventRoute);
