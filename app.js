const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

// environment variables /////
require("dotenv").config();

// importing routes /////
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// app /////
const app = express();

// db connection /////
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

// middleware /////
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());

// routes middleware /////
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// port /////
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
