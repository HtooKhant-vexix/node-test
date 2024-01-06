const DB = require("../models/user.js");
const Helper = require("../utils/helper.js");

const get = async (req, res, next) => {
  let user = await DB.find();
  Helper.fMsg(res, "all user", user);
  //   res.json({ msg: "get" });
};
const singleGet = async (req, res, next) => {
  let id = req.params.id;
  let user = await DB.findById(id);
  Helper.fMsg(res, "single user", user);
  //   res.json({ msg: "get" });
};

const post = async (req, res, next) => {
  let saveUser = new DB(req.body);
  let result = await saveUser.save();
  Helper.fMsg(res, "User add", result);
};

const patch = async (req, res, next) => {
  let user = await DB.findById(req.params.id);
  if (user) {
    await DB.findByIdAndUpdate(user._id, req.body);
    let retUser = await DB.findById(user._id);
    Helper.fMsg(res, "update user", retUser);
  } else {
    next(new Error("Error,no user with that"));
  }
};

const drop = async (req, res, next) => {
  await DB.findByIdAndDelete(req.params.id);
  Helper.fMsg(res, "User was deleted");
};

module.exports = {
  get,
  post,
  patch,
  drop,
  singleGet,
};
