const {
    calculateMonthlyCost
} = require("./cost.engine");


const generateRecommendation = (resource) => {

    const monthlyCost = calculateMonthlyCost({
        hourlyPrice: resource.hourlyPrice
    });


    // Rule 1:
    // Resource is stopped but still has cost

    if (
        resource.status === "stopped" &&
        monthlyCost > 0
    ) {

        return {

            type: "COST_SAVING",

            severity: "HIGH",

            message:
                "This resource is stopped but is still generating estimated cost.",

            recommendation:
                "Consider stopping or terminating this unused resource.",

            potentialMonthlySavings:
                Number(monthlyCost.toFixed(2))

        };

    }


    // Rule 2:
    // Resource is inactive but still has cost

    if (
        resource.status === "inactive" &&
        monthlyCost > 0
    ) {

        return {

            type: "COST_SAVING",

            severity: "MEDIUM",

            message:
                "This resource is inactive but still has an estimated monthly cost.",

            recommendation:
                "Review whether this resource is still required.",

            potentialMonthlySavings:
                Number(monthlyCost.toFixed(2))

        };

    }


    // Rule 3:
    // Resource has a high monthly cost

    if (monthlyCost > 100) {

        return {

            type: "COST_OPTIMIZATION",

            severity: "MEDIUM",

            message:
                "This resource has a relatively high estimated monthly cost.",

            recommendation:
                "Review the resource configuration and consider a lower-cost option.",

            potentialMonthlySavings:
                Number(
                    (monthlyCost * 0.20).toFixed(2)
                )

        };

    }


    // No optimization required

    return null;

};


module.exports = {
    generateRecommendation
};