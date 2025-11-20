import { Router } from "express";
import {createLink, getAllLinks, getLinkByCode, deleteLink} from "../controllers/link.controllers.js";

const router = Router();

router.route("/").post(createLink).get(getAllLinks);
router.route("/:code").get(getLinkByCode).delete(deleteLink);

export default router;

