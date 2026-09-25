const pricingRepository =
    require("../repositories/pricing.repository");

const {
    calculateMonthlyCost
} = require("../engines/cost.engine");

const resourceRepository =
    require("../repositories/resource.repository");

const costSnapshotRepository =
    require("../repositories/costSnapshot.repository");

const AppError =
    require("../utils/AppError");


const calculateResourceCost = async ({
    provider,
    service,
    resourceType,
    region
}) => {

    const pricing =
        await pricingRepository.findPricing({
            provider,
            service,
            resourceType,
            region
        });

    if (!pricing) {

        throw new AppError(
            "Pricing information not found",
            404
        );

    }

    const monthlyCost =
        calculateMonthlyCost({
            hourlyPrice: pricing.hourlyPrice
        });

    return {

        provider,

        service,

        resourceType,

        region,

        hourlyPrice:
            pricing.hourlyPrice,

        currency:
            pricing.currency,

        monthlyCost

    };
};


const calculateCostForResource = async (
    resourceId,
    userId
) => {

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

    const pricing =
        await pricingRepository.findPricing({
            provider: resource.provider,
            service: resource.service,
            resourceType: resource.resourceType,
            region: resource.region
        });

    if (!pricing) {

        throw new AppError(
            "Pricing information not found for this resource",
            404
        );

    }

    const monthlyCost =
        calculateMonthlyCost({
            hourlyPrice: pricing.hourlyPrice
        });

    return {

        resource: {

            id: resource._id,

            name: resource.name,

            provider:
                resource.provider,

            service:
                resource.service,

            resourceType:
                resource.resourceType,

            region:
                resource.region,

            status:
                resource.status

        },

        pricing: {

            hourlyPrice:
                pricing.hourlyPrice,

            currency:
                pricing.currency

        },

        estimatedMonthlyCost:
            monthlyCost

    };

};



const getCostSummary = async (userId) => {

    const resources =
        await resourceRepository.getResourcesByUser(
            userId,
            {},
            0,
            1000
        );


    if (!resources.length) {

        return {

            currency: "USD",

            totalMonthlyCost: 0,

            resourceCount: 0,

            serviceCount: 0,

            regionCount: 0,

            costBreakdown: [],

            costByType: []

        };

    }


    
    let totalMonthlyCost = 0;

    const services =
        new Set();

    const regions =
        new Set();

    const costBreakdown = [];

    const costByType = {};


   
    resources.forEach((resource) => {

        const monthlyCost =
            calculateMonthlyCost({
                hourlyPrice:
                    resource.hourlyPrice
            });


        totalMonthlyCost +=
            monthlyCost;


       
        if (resource.service) {

            services.add(
                resource.service
            );

        }


    
        if (resource.region) {

            regions.add(
                resource.region
            );

        }


     
        if (
            !costByType[
                resource.resourceType
            ]
        ) {

            costByType[
                resource.resourceType
            ] = 0;

        }

        costByType[
            resource.resourceType
        ] += monthlyCost;


  
        costBreakdown.push({

            resourceId:
                resource._id,

            name:
                resource.name,

            resourceType:
                resource.resourceType,

            region:
                resource.region,

            monthlyCost:
                Number(
                    monthlyCost.toFixed(2)
                )

        });

    });


 
    const costByTypeArray =
        Object.entries(
            costByType
        ).map(
            ([resourceType, monthlyCost]) => ({

                resourceType,

                monthlyCost:
                    Number(
                        monthlyCost.toFixed(2)
                    )

            })
        );



const finalMonthlyCost =
    Number(
        totalMonthlyCost.toFixed(2)
    );

console.log(
    "📸 ABOUT TO CREATE COST SNAPSHOT"
);

const snapshot =
    await costSnapshotRepository.createSnapshot({

        user: userId,

        date: new Date(),

        totalCost: finalMonthlyCost,

        currency: "USD"

    });

console.log(
    "✅ COST SNAPSHOT CREATED:",
    snapshot
);

return {

    currency: "USD",

    totalMonthlyCost:
        finalMonthlyCost,

    resourceCount:
        resources.length,

    serviceCount:
        services.size,

    regionCount:
        regions.size,

    costBreakdown,

    costByType:
        costByTypeArray

};

};

module.exports = {

    calculateResourceCost,

    calculateCostForResource,

    getCostSummary

};