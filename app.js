const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const userRouter = require("./routes/user.route.js");


app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected");
});


app.use("/api",userRouter);


app.listen(3000, console.log("server is up and running on"));