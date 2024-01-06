require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
const fileUpload = require("express-fileupload");
const { saveFile, saveFiles, deleteFile } = require("./utils/gallery.js");

const app = express();
app.use(express.json());
app.use(fileUpload());

const userRoute = require("./routes/user.js");
const postRoute = require("./routes/post.js");
const catRoute = require("./routes/cat.js");

const funky = (req, res, next) => {
  res.json({ msg: "coming with get method" });
};

const islogged = (req, res, next) => {
  if (1 + 1 == 2) {
    req.msg = " hello ";
    next();
  } else {
    next(new Error("you are not a user"));
  }
};

const isAdmin = (req, res, next) => {
  if (5 == 5) {
    console.log(req.msg);
    next();
  } else {
    next(new Error("only admin can enter"));
  }
};

// app.use("/users", islogged, isAdmin, funky);
app.post("/gallery", saveFiles, (req, res, next) => {
  // deleteFile(req.body.name);
  res.status(200).json({ msg: "file upload", files: req.body.images });
});

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/cats", catRoute);

app.use((err, req, res, next) => {
  err.status = err.sattus || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

app.listen(
  process.env.PORT,
  console.log(`server is running at port ${process.env.PORT}`)
);
