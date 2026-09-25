const express =
    require("express");

const router =
    express.Router();

const authenticateUser =
    require("../middleware/auth.middleware");

const {
    getRecommendations
} =
    require("../controllers/recommendation.controller");


router.get(
    "/",
    authenticateUser,
    getRecommendations
);


module.exports = router;