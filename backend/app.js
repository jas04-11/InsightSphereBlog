const dotenv = require("dotenv");
const mongoose = require("mongoose");

//const createError = require('http-errors');
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
//const logger = require('morgan');
const cors = require("cors");

dotenv.config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected to mongoDb");
  } catch (error) {
    console.log("error");
  }
};

const app = express();

// Middleware

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());

// Routes

app.use("/", indexRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running at ${PORT}`);
});
