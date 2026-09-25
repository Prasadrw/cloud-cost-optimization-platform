const resourceService = require("../services/resource.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const createResource = asyncHandler(async (req, res) => {

    const resourceData = {
        ...req.body,
        user: req.user.id,
    };

    const resource = await resourceService.createResource(resourceData);

    res.status(201).json({
        success: true,
        message: "Resource created successfully",
        data: resource,
    });

});

const getResources = asyncHandler(async (req, res) => {

    const result =
        await resourceService.getResourcesByUser(
            req.user.id,
            req.query
        );

    res.status(200).json({

        success: true,

        message: "Resources retrieved successfully",

        data: result.resources,

        pagination: {

            total: result.total,

            page: result.page,

            limit: result.limit,

            totalPages: result.totalPages

        }

    });

});



const getResourceById = asyncHandler(async (req, res) => {

    const resource =
        await resourceService.getResourceById(
            req.params.id,
            req.user.id
        );

    res.status(200).json({
        success: true,
        message: "Resource retrieved successfully",
        data: resource
    });

});

const updateResource = asyncHandler(async (req, res) => {

    const resource = await resourceService.updateResource(
        req.params.id,
        req.user.id,
        req.body
    );

    res.status(200).json({

        success: true,

        message: "Resource updated successfully",

        data: resource

    });

});
const deleteResource = asyncHandler(async (req, res) => {

    await resourceService.deleteResource(
        req.params.id,
        req.user.id
    );

    res.status(200).json({

        success: true,

        message: "Resource deleted successfully"

    });

});

module.exports = {
    createResource,
    getResources,
    getResourceById,
    updateResource,
    deleteResource

};