var mongoose = require("mongoose");

/*const blogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  
});*/
const blogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      name: String,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});


const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;
