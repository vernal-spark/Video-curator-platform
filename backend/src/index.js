const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

// Set mongoose strictQuery to false to suppress deprecation warning
mongoose.set("strictQuery", false);

let server;

// Graceful shutdown handler
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  if (server) {
    server.close(() => {
      console.log("HTTP server closed.");

      mongoose.connection.close(false, () => {
        console.log("MongoDB connection closed.");
        process.exit(0);
      });
    });
  } else {
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  }
};

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  gracefulShutdown("UNHANDLED_REJECTION");
});

// Handle termination signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Connect to MongoDB
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log("✅ Connected to MongoDB at:", config.mongoose.url);

    server = app.listen(config.port, () => {
      console.log(`🚀 Server listening on port ${config.port}`);
      console.log(`📊 Environment: ${config.env}`);
      console.log(`🔗 Health check: http://localhost:${config.port}/health`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });

// Handle MongoDB connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});
