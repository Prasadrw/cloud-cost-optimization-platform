const User = require("../models/user.model");

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserWithPassword = async (email) => {
    return await User.findOne({ email }).select("+password");
};


module.exports = {
    findByEmail,
    createUser,
    findUserWithPassword
};