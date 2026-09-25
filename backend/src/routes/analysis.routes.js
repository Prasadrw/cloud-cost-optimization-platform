const express = require("express");

const router = express.Router();

const authenticateUser =
    require("../middleware/auth.middleware");

const {
    getSummary,
    getCostByService,
    getCostByRegion,
    getCostTrends
} = require("../controllers/analysis.controller");

router.get(
    "/summary",
    authenticateUser,
    getSummary
);
router.get(
    "/services",
    authenticateUser,
    getCostByService
);
router.get(
    "/regions",
    authenticateUser,
    getCostByRegion
);
router.get(
    "/trends",
    authenticateUser,
    getCostTrends
);

module.exports = router;