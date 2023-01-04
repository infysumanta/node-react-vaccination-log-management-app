const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./model.options");

const vaccineShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  schemaOptions
);

const Vaccine = mongoose.model("Vaccine", vaccineShema);

module.exports = Vaccine;
