import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import YAML from "yamljs";
// import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

// internal files
import urlRouter from "./routes/url.route.js";
// import swaggerSpec from "./docs/swaggerSpec.js";
const swaggerSpec = YAML.load("./src/docs/api-doc.yaml");

const app = express();

// Middleware parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logging the requests
app.use(morgan("dev"));

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Db connected..");
  })
  .catch((err) => {
    console.log(err);
  });

// documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API route points
app.use("/api/url", urlRouter);

// Error handling route
app.use((err, req, res, next) => {
  if (err) {
    return res.status(err.status || 500).json({
      error: {
        code: err.code || "1010",
        message: err.message,
      },
    });
  }

  res.status(404).json({
    error: {
      message: "Route does not found",
    },
  });
});

export default app;
