const Pricing = require("../models/pricing.model");

const findPricing = async ({
    provider,
    service,
    resourceType,
    region
}) => {

    return await Pricing.findOne({
        provider,
        service,
        resourceType,
        region
    });

};

module.exports = {
    findPricing
};