const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./model.options");

const userVaccineSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vaccine: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
      required: true,
    },
    vaccineLot: {
      type: Schema.Types.ObjectId,
      ref: "VaccineLot",
      required: true,
    },
  },
  schemaOptions
);

const UserVaccine = mongoose.model("UserVaccine", userVaccineSchema);

module.exports = UserVaccine;
