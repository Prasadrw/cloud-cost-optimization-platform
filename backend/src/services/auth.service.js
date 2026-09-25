const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const registerUser = async (userData) => {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
        throw new AppError(
    "Email already registered",
    409
);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    return await userRepository.createUser(userData);
};

const loginUser = async (email, password) => {

    const user = await userRepository.findUserWithPassword(email);

    if (!user) {
        throw new AppError(
    "Invalid email or password",
    401
);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError(
    "Invalid email or password",
    401
);
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    registerUser,
    loginUser
};