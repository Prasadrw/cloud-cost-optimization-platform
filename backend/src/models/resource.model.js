const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        provider: {
            type: String,
            enum: ["AWS"],
            default: "AWS",
            required: true,
        },

        service: {
            type: String,
            required: true,
            trim: true,
        },

        resourceType: {
            type: String,
            enum: ["EC2", "S3", "RDS", "Lambda"],
            required: true,
        },

        resourceId: {
            type: String,
            required: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        region: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["running", "stopped", "active", "inactive"],
            default: "active",
        },

        configuration: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        hourlyPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        estimatedMonthlyCost: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

resourceSchema.index({ user: 1 });

resourceSchema.index({
    user: 1,
    resourceType: 1
});

module.exports = mongoose.model("Resource", resourceSchema);