const express = require("express");

const {
  handleLoginUser,
  handleCreateNewUser,
  handleGetArticles,
} = require("../controllers/authentication/user");

const router = express.Router();

router.route("/").post(handleCreateNewUser);
router.route("/login").post(handleLoginUser);
router.route("/getArticles/:category").get(handleGetArticles);

module.exports = router;
