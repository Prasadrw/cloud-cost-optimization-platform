const getProfile = async (req, res) => {

    res.status(200).json({

        success: true,

        message: "Protected Route Accessed",

        loggedInUser: req.user

    });

};

module.exports = {

    getProfile

};