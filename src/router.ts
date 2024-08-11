import { Router } from "express";
import { upload } from "./handlers/upload";
import { createReport, getAllReports, getReportById } from "./handlers/report";
import { getProfile, getStaff } from "./handlers/user";
import { createTask, getTasks, getTasksAssigned } from "./handlers/task";
import { getListMenuByRole } from "./handlers/menu";

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
router.get("/task/all", getTasks)
router.get("/task/assigned",getTasksAssigned);



/**
 * User / pengguna
 */
router.get("/user",getProfile);
router.get("/user/staff", getStaff )

router.get("/listMenu", getListMenuByRole)




export default router;