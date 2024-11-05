const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playschema = new Schema(
  {
    Pranker: {
      type: String,
      required: true,
    },
    Crusher: {
      type: String,
      required: true,
    },
    Crushee: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Player", playschema);
