const mongoose = require("mongoose");

const config = require(".");

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log(err);
      console.log("Database connection error: " + err.message);
    });
};

module.exports = { connectDB };
