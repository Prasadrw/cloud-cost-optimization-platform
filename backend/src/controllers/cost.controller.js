const costService =
    require("../services/cost.service");

const asyncHandler =
    require("../utils/asyncHandler");

const calculateCost = asyncHandler(
    async (req, res) => {

        const result =
            await costService.calculateResourceCost({
                provider: req.query.provider,
                service: req.query.service,
                resourceType: req.query.resourceType,
                region: req.query.region
            });

        res.status(200).json({

            success: true,

            message: "Cost calculated successfully",

            data: result

        });
    }
);
const calculateResourceCost =
    asyncHandler(async (req, res) => {

        const result =
            await costService.calculateCostForResource(
                req.params.resourceId,
                req.user.id
            );

        res.status(200).json({

            success: true,

            message: "Resource cost calculated successfully",

            data: result

        });

    });

    const getCostSummary = asyncHandler(
    async (req, res) => {

        const result =
            await costService.getCostSummary(
                req.user.id
            );


        res.status(200).json({

            success: true,

            message: "Cost summary retrieved successfully",

            data: result

        });

    }
);

module.exports = {
    calculateCost,
    calculateResourceCost,
    getCostSummary
};