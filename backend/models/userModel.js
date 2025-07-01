const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  savedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "blog" }],

  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
