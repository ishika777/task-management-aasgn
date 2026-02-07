import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/Task.controller.js";

import { authoriseUser } from "../utils/auth.middleware.js";

const router = express.Router();


router.get("/", authoriseUser, getAllTasks);

router.post("/", authoriseUser, createTask);

router.put("/:id", authoriseUser, updateTask);

router.patch("/:id/status", authoriseUser, updateTaskStatus);

router.delete("/:id", authoriseUser, deleteTask);

export default router;
