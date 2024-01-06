const DB = require("../models/post");
const Helper = require("../utils/helper");
const all = async (req, res, next) => {
  let user = await DB.find();
  Helper.fMsg(res, "all post", user);
};

const post = async (req, res, next) => {
  // console.log(req.body);
  let savePost = await new DB(req.body).save();
  // let post = await savePost.save();
  Helper.fMsg(res, "post added", savePost);
};

// const post = async (req, res, next) => {
//   let saveUser = new DB(req.body);
//   let result = await saveUser.save();
//   Helper.fMsg(res, "User add", result);
// };

const patch = async (req, res, next) => {
  let user = await DB.findById(req.params.id);
  if (user) {
    await DB.findByIdAndUpdate(user._id, req.body);
    let retPost = await DB.findById(user._id);
    Helper.fMsg(res, "update user", retPost);
  } else {
    next(new Error("error is occours"));
  }
};

// const patch = async (req, res, next) => {
//   let user = await DB.findById(req.params.id);
//   if (user) {
//     await DB.findByIdAndUpdate(user._id, req.body);
//     let retUser = await DB.findById(user._id);
//     Helper.fMsg(res, "update user", retUser);
//   } else {
//     next(new Error("Error,no user with that"));
//   }
// };
module.exports = { all, post, patch };
