import { Router } from "express";
import { upload } from "./handlers/upload";
import { createReport, getAllReports, getReportById } from "./handlers/report";
import { getProfile } from "./handlers/user";
import { createTask, getTasksAssigned } from "./handlers/task";

const router = Router();
/**
 * Report / laporan
 */
router.post("/report",upload.single('photo'), createReport);
router.get("/report",getAllReports);
router.get("/report/all", getAllReports);
router.get("/report/:id", getReportById)

/**
 * Task / Tugas
 */
router.post("/task", createTask)
router.get("/tasks",getTasksAssigned);



/**
 * User / pengguna
 */
router.get("/user",getProfile);




export default router;