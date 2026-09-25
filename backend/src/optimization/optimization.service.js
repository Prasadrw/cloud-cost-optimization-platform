const resourceRepository =
    require("../repositories/resource.repository");

const {
    checkUnderutilizedEc2
} = require("./rules/underutilizedEc2.rule");

const {
    checkStoppedResource
} = require("./rules/stoppedResource.rule");

const {
    checkExpensiveResource
} = require("./rules/expensiveResource.rule");


const getRecommendations = async (userId) => {

    const resources =
        await resourceRepository
            .getResourcesByUser(userId);

    const recommendations = [];

    for (const resource of resources) {

        const rules = [
            checkUnderutilizedEc2,
            checkStoppedResource,
            checkExpensiveResource
        ];

        for (const rule of rules) {

            const recommendation =
                rule(resource);

            if (recommendation) {
                recommendations.push(
                    recommendation
                );
            }
        }
    }

    return recommendations;
};


module.exports = {
    getRecommendations
};