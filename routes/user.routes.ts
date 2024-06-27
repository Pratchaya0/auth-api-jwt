import express from "express";
import { PaginationSchema } from "../schema/pagination.schema";
import { getList } from "../controller/user.controller";

const router = express.Router();

router.get("/api/users", getList);

export default router;
