const { default: mongoose } = require("mongoose");

const crudSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  profilePic: {
    type: String,
    default: null,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

const Crud = mongoose.model("Crud", crudSchema);

module.exports = Crud;
