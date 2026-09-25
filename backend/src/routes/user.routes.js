const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");

const {

    getProfile

} = require("../controllers/user.controller");

router.get(

    "/profile",

    authenticateUser,

    getProfile

);

module.exports = router;