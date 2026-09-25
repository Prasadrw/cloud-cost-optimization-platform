const express = require("express");

const router = express.Router();

const authenticateUser =
    require("../middleware/auth.middleware");

const {
    calculateCost,
    calculateResourceCost,
    getCostSummary
} = require("../controllers/cost.controller");


router.get(
    "/calculate",
    authenticateUser,
    calculateCost
);


router.get(
    "/resources/:resourceId",
    authenticateUser,
    calculateResourceCost
);

router.get(
    "/summary",
    authenticateUser,
    getCostSummary
);


module.exports = router;