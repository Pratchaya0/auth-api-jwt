import express from "express";
import { registerController } from "../controller/auth.controller";
import validateResource from "../middleware/validate-resource";
import { RegisterSchema } from "../schema/auth.schema";

const router = express.Router();

router.post(
  "/api/register",
  validateResource(RegisterSchema),
  registerController
);

export default router;
