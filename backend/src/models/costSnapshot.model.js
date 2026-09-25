const mongoose = require("mongoose");

const costSnapshotSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        date: {
            type: Date,
            required: true,
            index: true
        },

        totalCost: {
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

module.exports = mongoose.model(
    "CostSnapshot",
    costSnapshotSchema
);