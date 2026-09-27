const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donarRoutes");
const requestRoutes = require("./routes/requestRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);

// Serve the built React app and support client-side routes.
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));
app.get(/^(?!\/api(?:\/|$)).*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();