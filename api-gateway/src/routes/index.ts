import * as express from "express";
import { healtcheckRouter } from "./healthcheck";
import { testRouter } from "./test";
import { ordersRouter } from "./orders";

let router = express.Router();

router.use("/healthcheck", healtcheckRouter);
router.use("/test", testRouter);
router.use("/orders", ordersRouter);

// Export the router
export = router;
