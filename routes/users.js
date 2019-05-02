var express = require("express");
var router = express.Router();

var User = require("../schema/user");
/* GET users listing. */
router.get("/", function(req, res) {
  User.find({ role: { $ne: 1 } }, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.render("users", {
        successMsg: req.flash("successMsg"),
        errorMsg: req.flash("errorMsg"),
        users: users
      });
    }
  });
});

module.exports = router;
