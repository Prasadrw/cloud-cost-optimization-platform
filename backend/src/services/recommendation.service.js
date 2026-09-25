const resourceRepository =
    require("../repositories/resource.repository");

const {
    generateRecommendation
} = require("../engines/recommendation.engine");


const getRecommendations = async (userId) => {

    const resources =
        await resourceRepository.getResourcesByUser(
            userId,
            {},
            0,
            1000
        );


    const recommendations = [];


    resources.forEach((resource) => {

        const recommendation =
            generateRecommendation(resource);


        if (recommendation) {

            recommendations.push({

                resourceId: resource._id,

                resourceName: resource.name,

                resourceType:
                    resource.resourceType,

                region: resource.region,

                ...recommendation

            });

        }

    });


    const totalPotentialSavings =
        recommendations.reduce(
            (total, recommendation) =>
                total +
                recommendation.potentialMonthlySavings,
            0
        );


    return {

        recommendations,

        totalRecommendations:
            recommendations.length,

        totalPotentialSavings:
            Number(
                totalPotentialSavings.toFixed(2)
            )

    };

};


module.exports = {
    getRecommendations
};