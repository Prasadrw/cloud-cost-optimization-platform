const UNDERUTILIZED_CPU_THRESHOLD = 20;

const checkUnderutilizedEc2 = (resource) => {

    if (resource.service !== "EC2") {
        return null;
    }

    if (
        typeof resource.cpuUtilization !== "number"
    ) {
        return null;
    }

    if (
        resource.cpuUtilization >=
        UNDERUTILIZED_CPU_THRESHOLD
    ) {
        return null;
    }

    return {
        type: "UNDERUTILIZED_EC2",

        severity: "MEDIUM",

        title: "EC2 instance may be underutilized",

        message:
            "CPU utilization is below 20%. Consider evaluating a smaller instance type.",

        resourceId: resource._id,

        estimatedSavings: resource.monthlyCost
            ? Number(
                (resource.monthlyCost * 0.30)
                .toFixed(2)
            )
            : 0
    };
};

module.exports = {
    checkUnderutilizedEc2
};