const analysisService =
    require("../services/analysis.service");

const asyncHandler =
    require("../utils/asyncHandler");

const getSummary = asyncHandler(
    async (req, res) => {

        const summary =
            await analysisService.getSummary(
                req.user.id
            );

        res.status(200).json({

            success: true,

            message: "Cost summary retrieved successfully",

            data: summary

        });

    }
);
const getCostByService = asyncHandler(
    async (req, res) => {

        const serviceCosts =
            await analysisService.getCostByService(
                req.user.id
            );

        res.status(200).json({

            success: true,

            message:
                "Service cost analysis retrieved successfully",

            data: serviceCosts

        });

    }
);
const getCostByRegion = asyncHandler(
    async (req, res) => {

        const regionCosts =
            await analysisService.getCostByRegion(
                req.user.id
            );

        res.status(200).json({

            success: true,

            message:
                "Region cost analysis retrieved successfully",

            data: regionCosts

        });

    }
);
const getCostTrends = asyncHandler(
    async (req, res) => {

        const endDate = new Date();

        const startDate = new Date();

        startDate.setDate(
            startDate.getDate() - 30
        );

        const trends =
            await analysisService.getCostTrends(
                req.user.id,
                startDate,
                endDate
            );

        res.status(200).json({

            success: true,

            message:
                "Cost trends retrieved successfully",

            data: trends

        });

    }
);
module.exports = {
    getSummary,
    getCostByService,
    getCostByRegion,
    getCostTrends
};