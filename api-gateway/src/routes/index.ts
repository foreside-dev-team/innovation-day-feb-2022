import * as express from "express";
import { healtcheckRouter } from "./healthcheck";
import { testRouter } from "./test";

let router = express.Router();

router.use("/healthcheck", healtcheckRouter);
router.use("/test", testRouter);

// Export the router
export = router;
