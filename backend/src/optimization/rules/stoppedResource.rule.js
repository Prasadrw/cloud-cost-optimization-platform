const checkStoppedResource = (resource) => {

    if (resource.status !== "stopped") {
        return null;
    }

    return {
        type: "STOPPED_RESOURCE",

        severity: "HIGH",

        title: "Stopped resource may be unnecessary",

        message:
            "This resource is currently stopped. Verify whether it is still required.",

        resourceId: resource._id,

        estimatedSavings: resource.monthlyCost
            ? Number(
                resource.monthlyCost.toFixed(2)
            )
            : 0
    };
};

module.exports = {
    checkStoppedResource
};