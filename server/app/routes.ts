import express from "express";
import swaggerUi from "swagger-ui-express";
// import swaggerJsonFile from "../swagger-output.json"
import swaggerJsonFile from "../swagger/swagger.json"
import { userEnum } from "./user/user.dto";

// Routes
import userRoutes from "./user/user.route";
import drawRoutes from "./Drawing/draw.route";
import authRoutes from "./auth/auth.route"
import { roleAuthMiddleware } from "./common/middleware/role-auth.middleware";

// routes
const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));
router.use("/users", userRoutes);
router.use("/draw", roleAuthMiddleware([...userEnum]), drawRoutes);
router.use("/", authRoutes);

export default router;