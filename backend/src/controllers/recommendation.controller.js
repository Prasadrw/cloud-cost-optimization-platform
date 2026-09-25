const recommendationService =
    require("../services/recommendation.service");

const asyncHandler =
    require("../utils/asyncHandler");


const getRecommendations = asyncHandler(
    async (req, res) => {

        const result =
            await recommendationService.getRecommendations(
                req.user.id
            );


        res.status(200).json({

            success: true,

            message:
                "Recommendations fetched successfully",

            data: result

        });

    }
);


module.exports = {
    getRecommendations
};