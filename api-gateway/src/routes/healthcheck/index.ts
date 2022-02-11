import { Router, Request, Response } from "express";
import axios from "axios";
import { config } from "../../config";

const healtcheckRouter = Router();

healtcheckRouter.get("/", async (request: Request, response: Response) => {
  try {
    const check = await axios.get(
      `http://apigateway:apigateway@${config.rabbitmq.host}:15672/api/aliveness-test/%2F`
    );
    response.send(check.data);
  } catch (error) {
    console.error(`Error RabbitMQ Healtcheck: ${error}`);
    response.send({
      status: "not_ok",
    });
  }
});

export { healtcheckRouter };
