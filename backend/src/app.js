const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Security Middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Logging
app.use(morgan("dev"));

//custom Middleware
const loggerMiddleware = require("./middleware/loggerMiddleware");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/error.middleware");
const resourceRoutes = require("./routes/resource.routes");
const costRoutes =require("./routes/cost.routes");
const analysisRoutes =require("./routes/analysis.routes");
const recommendationRoutes =require("./routes/recommendation.routes");

app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/costs",costRoutes);
app.use("/api/v1/analysis",analysisRoutes);
app.use("/api/v1/recommendations",recommendationRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Cloud Cost Optimization Platform API Running"
    });
});
app.use(errorHandler);

module.exports = app;