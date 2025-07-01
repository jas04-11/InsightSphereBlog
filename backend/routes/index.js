var express = require("express");
var router = express.Router();
var userModel = require("../models/userModel");
var blogModel = require("../models/blogModel");
const multer = require("multer");
const path = require("path");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");
const secret = "secret";

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email });
  if (emailCon) {
    return res.json({
      success: false,
      msg: "Email already exists",
    });
  } else {
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) throw err;
        let user = await userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash,
        });

        return res.json({
          success: true,
          msg: "User created successfully",
        });
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.json({
      success: false,
      msg: "User not found",
    });
  } else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ userId: user._id }, secret);
        return res.json({
          success: true,
          msg: "User logged in successfully",
          token: token,
        });
      } else {
        return res.json({
          success: false,
          msg: "Invalid password",
        });
      }
    });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/mern projects/Blog App/backend/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extName = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extName);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadBlog", upload.single("image"), async (req, res) => {
  try {
    let { token, title, desc, content } = req.body;
    // Decode the token to get the user ID
    let decoded = jwt.verify(token, secret);
    let user = await userModel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }

    // Retrieve the file name from the uploaded file
    const imageName = req.file ? req.file.filename : null;

    // Create a new blog entry
    let blog = await blogModel.create({
      title: title,
      content: content,
      image: imageName, // Use the image name here
      desc: desc,
      user: user._id,
    });

    // Respond with success
    return res.json({
      success: true,
      msg: "Blog created successfully",
      blog: blog,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      msg: "An error occurred",
    });
  }
});
router.post("/getBlog", async (req, res) => {
  const { token, blogId } = req.body;
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    const blog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $inc: { views: 1 } },
      { new: true }
    );

    const isSaved = user.savedBlogs.includes(blogId); // ✅ Ensure this line is present

    return res.json({
      success: true,
      msg: "Blog fetched successfully",
      blog,
  savedBlogs: user.savedBlogs, // ✅ Add this

    });
  } catch (err) {
    return res.json({ success: false, msg: "Something went wrong" });
  }
});

// 🆕 NEW: Like a blog post
router.post("/likeBlog", async (req, res) => {
  const { token, blogId } = req.body;
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findById(decoded.userId);
    if (!user) return res.json({ success: false, msg: "User not found" });

    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    return res.json({ success: true, likes: blog.likes });
  } catch (err) {
    return res.json({ success: false, msg: "Something went wrong" });
  }
});
//Comment
router.post("/comment", async (req, res) => {
  const { token, blogId, text } = req.body;

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findById(decoded.userId);
    if (!user) return res.json({ success: false, msg: "User not found" });

    const comment = {
      userId: user._id,
      name: user.name,
      text,
      createdAt: new Date(),
    };

    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      { $push: { comments: comment } },
      { new: true }
    );

    return res.json({
      success: true,
      msg: "Comment added",
      comments: blog.comments,
    });
  } catch (err) {
    console.error("Comment error:", err.message);
    return res.json({ success: false, msg: "Failed to add comment" });
  }
});
//toggleSaveBlog
router.post("/toggleSaveBlog", async (req, res) => {
  const { token, blogId } = req.body;
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findById(decoded.userId);

    if (!user) return res.json({ success: false, msg: "User not found" });

    const isSaved = user.savedBlogs.includes(blogId);

    if (isSaved) {
      user.savedBlogs.pull(blogId);
    } else {
      user.savedBlogs.push(blogId);
    }

    await user.save();
    return res.json({
      success: true,
      saved: !isSaved,
      msg: isSaved ? "Removed from saved blogs" : "Saved for later",
    });
  } catch (err) {
    return res.json({ success: false, msg: "Error toggling saved blog" });
  }
});
//getsavedBlog
router.post("/getSavedBlogs", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel
      .findById(decoded.userId)
      .populate("savedBlogs");

    return res.json({
      success: true,
      blogs: user.savedBlogs,
    });
  } catch (err) {
    return res.json({ success: false, msg: "Error fetching saved blogs" });
  }
});

router.post("/getBlogs", async (req, res) => {
  let { token } = req.body;
  let decoded = jwt.verify(token, secret);
  let user = await userModel.findOne({ _id: decoded.userId });
  if (!user) {
    return res.json({
      success: false,
      msg: "User not found",
    });
  } else {
    let blogs = await blogModel.find({});
    return res.json({
      success: true,
      msg: "Blogs featched successfully",
      blogs: blogs,
    });
  }
});



/*router.post("/getBlog", async (req, res) => {
  let { token, blogId } = req.body;
  let decoded = jwt.verify(token, secret);
  let user = await userModel.findOne({ _id: decoded.userId });
  if (!user) {
    return res.json({
      success: false,
      msg: "User not found",
    });
  } else {
    let blog = await blogModel.findOne({ _id: blogId });
    return res.json({
      success: true,
      msg: "Blog featched successfully",
      blog: blog,
    });
  }
});*/

module.exports = router;
