const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/auth.middleware");

const {
    createResource,
    getResources,
    getResourceById,
    updateResource,
    deleteResource
} = require("../controllers/resource.controller");

router.post(
    "/",
    authenticateUser,
    createResource
);

router.get(
    "/",
    authenticateUser,
    getResources
);

router.get(
    "/:id",
    authenticateUser,
    getResourceById
);

router.put(
    "/:id",
    authenticateUser,
    updateResource
);

router.delete(
    "/:id",
    authenticateUser,
    deleteResource
);


module.exports = router;