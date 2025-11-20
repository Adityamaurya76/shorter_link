import { Router } from "express";
import { getLinkByCode } from "../controllers/link.controllers.js";

const router = Router();

router.route("/code/:code").get(getLinkByCode);

export default router;

