import { Router } from "express";
import { upload } from "./handlers/upload";
import { createReport } from "./handlers/report";

const router = Router();
/**
 * Report / laporan
 */
router.post("/report",upload.single('photo'), createReport);




export default router;