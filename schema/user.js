var mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var User = new Schema({
  empId: String,
  name: String,
  email: String,
  role: String,
  password: String
});

module.exports = mongoose.model("User", User);
