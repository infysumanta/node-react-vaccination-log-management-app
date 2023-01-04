const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./model.options");

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  schemaOptions
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
