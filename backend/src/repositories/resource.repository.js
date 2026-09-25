const Resource = require("../models/resource.model");

const createResource = async (resourceData) => {

    return await Resource.create(resourceData);

};

const getResourcesByUser = async (
    userId,
    filters,
    skip,
    limit
) => {

    return await Resource.find({
        user: userId,
        ...filters
    })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

};

const countResourcesByUser = async (
    userId,
    filters
) => {

    return await Resource.countDocuments({
        user: userId,
        ...filters
    });

};

const getResourceById = async (
    resourceId,
    userId
) => {

    return await Resource.findOne({
        _id: resourceId,
        user: userId
    });

};

const updateResource = async (
    resourceId,
    userId,
    updateData
) => {

    return await Resource.findOneAndUpdate(
        {
            _id: resourceId,
            user: userId
        },
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

};

const deleteResource = async (
    resourceId,
    userId
) => {

    return await Resource.findOneAndDelete({
        _id: resourceId,
        user: userId
    });

};

const getResourceCountByUser = async (userId) => {

    return await Resource.countDocuments({
        user: userId
    });

};

module.exports = {
    createResource,
    getResourcesByUser,
    countResourcesByUser,
    getResourceById,
    updateResource,
    deleteResource,
    getResourceCountByUser
};