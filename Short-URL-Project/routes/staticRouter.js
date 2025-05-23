const express = require("express");
const URL = require("../models/url");
const router = express.Router();
const {
  checkAuth,
  restrictToLoggedinUserOnly,
} = require("../middlewares/auth");

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  try {
    const allUrls = await URL.find({ createdBy: req.user._id });
    res.render("home", {
      urls: allUrls,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal Server Error");
  }
});
// router.get("/", async (req, res) => {
//   if (!req.user) return res.redirect("/login");

//   const allUrls = await URL.find({ createdBy: req.user._id });
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
