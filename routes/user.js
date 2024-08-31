const express = require("express");

const {
  handleLoginUser,
  handleCreateNewUser,
} = require("../controllers/authentication/user");

const router = express.Router();

router.route("/").post(handleCreateNewUser);
router.route("/login").post(handleLoginUser);

module.exports = router;