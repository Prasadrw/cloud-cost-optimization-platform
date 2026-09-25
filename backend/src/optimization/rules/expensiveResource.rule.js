const EXPENSIVE_RESOURCE_THRESHOLD = 100;

const checkExpensiveResource = (resource) => {

    if (
        typeof resource.monthlyCost !== "number"
    ) {
        return null;
    }

    if (
        resource.monthlyCost <=
        EXPENSIVE_RESOURCE_THRESHOLD
    ) {
        return null;
    }

    return {
        type: "EXPENSIVE_RESOURCE",

        severity: "LOW",

        title: "High-cost resource detected",

        message:
            "This resource has a relatively high monthly cost and should be reviewed for optimization.",

        resourceId: resource._id,

        estimatedSavings: Number(
            (resource.monthlyCost * 0.10)
            .toFixed(2)
        )
    };
};

module.exports = {
    checkExpensiveResource
};