import { Router } from "express";
import {
  diagnoseDisease,
  getAllDiagnosis,
  getDiagnosis,
} from "../controller/diagnosisController";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.post("/", authorize, diagnoseDisease);
router.get("/", authorize, getAllDiagnosis);
router.get("/:diagnosisId", authorize, getDiagnosis);

export default router;
