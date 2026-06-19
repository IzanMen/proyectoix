import { Router, type IRouter } from "express";
import healthRouter from "./health";
import appRouter from "./routes";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(appRouter);
router.use(storageRouter);

export default router;
