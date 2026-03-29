const express = require("express");
const authController = require("../controllers/auth.controller");


const router = express.Router();


/* POST /api/auth/register */
router.post("/register", (req, res) => {
  // Handle registration logic here
});

module.exports = router;