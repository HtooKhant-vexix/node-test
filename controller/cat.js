const DB = require("../models/cat");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let cats = await DB.find();
  Helper.fMsg(res, "cat", cats);
};
const add = async (req, res, next) => {
  let result = await new DB(req.body).save();
  Helper.fMsg(res, "Category", result);
};

module.exports = {
  all,
  add,
};
