import { Router } from "express";
import { upload } from "./handlers/upload";
import { createReport, getAllReports } from "./handlers/report";
import { getProfile } from "./handlers/user";
import { createTask } from "./handlers/task";

const router = Router();
/**
 * Report / laporan
 */
router.post("/report",upload.single('photo'), createReport);
router.get("/report",getAllReports);

/**
 * Task / Tugas
 */
router.post("/task", createTask)


/**
 * User / pengguna
 */
router.get("/user",getProfile);




export default router;