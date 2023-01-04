const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./model.options");

const userPlaceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
  },
  schemaOptions
);

const UserPlace = mongoose.model("UserPlace", userPlaceSchema);

module.exports = UserPlace;
