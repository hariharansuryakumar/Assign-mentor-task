const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
    },
  ],
});

module.exports = mongoose.model("mentors", mentorSchema);