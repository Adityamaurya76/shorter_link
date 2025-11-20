import { Router } from "express";
import { redirectLink } from "../controllers/link.controllers.js";

const router = Router();

router.route("/:code").get(redirectLink);

export default router;

