const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");

const registerUser = asyncHandler(async (req, res) => {

    const user = await authService.registerUser(req.body);

    res.status(201).json({

        success: true,

        message: "User registered successfully",

        data: user

    });

});
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await authService.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};