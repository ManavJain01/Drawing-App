import express from "express";
import swaggerUi from "swagger-ui-express";
// import swaggerJsonFile from "../swagger-output.json"
import swaggerJsonFile from "../swagger/swagger.json"

// Routes
import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route"

// routes
const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));
router.use("/users", userRoutes);
router.use("/", authRoutes);

export default router;