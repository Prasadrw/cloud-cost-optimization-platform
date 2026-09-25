const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            required: true,
            enum: ["AWS"]
        },

        service: {
            type: String,
            required: true,
            enum: ["EC2", "RDS", "S3"]
        },

        resourceType: {
            type: String,
            required: true
        },

        region: {
            type: String,
            required: true
        },

        hourlyPrice: {
            type: Number,
            required: true,
            min: 0
        },

        currency: {
            type: String,
            default: "USD"
        }
    },
    {
        timestamps: true
    }
);

pricingSchema.index({
    provider: 1,
    service: 1,
    resourceType: 1,
    region: 1
});

module.exports = mongoose.model(
    "Pricing",
    pricingSchema
);