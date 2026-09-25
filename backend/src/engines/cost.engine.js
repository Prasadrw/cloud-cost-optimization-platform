const MONTHLY_HOURS = 730;

const calculateMonthlyCost = ({
    hourlyPrice,
    hours = MONTHLY_HOURS
}) => {

    if (typeof hourlyPrice !== "number") {
        throw new Error("Hourly price must be a number");
    }

    if (hourlyPrice < 0) {
        throw new Error("Hourly price cannot be negative");
    }

    if (hours <= 0) {
        throw new Error("Hours must be greater than zero");
    }

    const monthlyCost = hourlyPrice * hours;

    return Number(monthlyCost.toFixed(2));
};

module.exports = {
    calculateMonthlyCost
};