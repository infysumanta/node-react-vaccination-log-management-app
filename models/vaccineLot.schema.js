const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./model.options");

const vaccineLotShema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    vaccinated: {
      type: Number,
      required: true,
      default: 0,
    },
    vaccine: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
      required: true,
    },
  },
  schemaOptions
);

const VaccineLot = mongoose.model("VaccineLot", vaccineLotShema);

module.exports = VaccineLot;
