const resourceRepository = require("../repositories/resource.repository");
const AppError = require("../utils/AppError");
const {
    calculateMonthlyCost
} = require("../engines/cost.engine");
const createResource = async (resourceData) => {

    const estimatedMonthlyCost =
        calculateMonthlyCost({
            hourlyPrice: resourceData.hourlyPrice
        });

    const data = {
        ...resourceData,
        estimatedMonthlyCost
    };

    return await resourceRepository.createResource(data);
};

const getResourcesByUser = async (
    userId,
    query
) => {

    const page = Math.max(
        parseInt(query.page) || 1,
        1
    );

    const limit = Math.min(
        Math.max(
            parseInt(query.limit) || 10,
            1
        ),
        100
    );

    const skip = (page - 1) * limit;

    const filters = {};

    if (query.resourceType) {
        filters.resourceType = query.resourceType;
    }

    if (query.region) {
        filters.region = query.region;
    }

    if (query.status) {
        filters.status = query.status;
    }

    const search = query.search;

    if (search) {

        filters.name = {
            $regex: search,
            $options: "i"
        };

    }

    const [resources, total] = await Promise.all([

        resourceRepository.getResourcesByUser(
            userId,
            filters,
            skip,
            limit
        ),

        resourceRepository.countResourcesByUser(
            userId,
            filters
        )

    ]);

    return {
        resources,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };

};

const getResourceById = async (resourceId, userId) => {

    const resource =
        await resourceRepository.getResourceById(
            resourceId,
            userId
        );

    if (!resource) {

        throw new AppError(
            "Resource not found",
            404
        );

    }

    return resource;

};
const updateResource = async (
    resourceId,
    userId,
    updateData
) => {

    const resource =
        await resourceRepository.updateResource(
            resourceId,
            userId,
            updateData
        );

    if (!resource) {

        throw new AppError(
            "Resource not found",
            404
        );

    }

    return resource;

};
const deleteResource = async (
    resourceId,
    userId
) => {

    const resource =
        await resourceRepository.deleteResource(
            resourceId,
            userId
        );

    if (!resource) {

        throw new AppError(
            "Resource not found",
            404
        );

    }

    return resource;

};

module.exports = {
    createResource,
    getResourcesByUser,
    getResourceById,
    updateResource,
    deleteResource
};