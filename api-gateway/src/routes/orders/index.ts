import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RabbitMQClient } from "../../services/rabbitmq/amqp-client";
import { config } from "../../config";
import { MessageProperties } from "amqplib";

const ordersRouter = Router();
const queue = "orders";

ordersRouter.post("/", async (req: Request, res: Response) => {
  const client = new RabbitMQClient({
    url: `amqp://${config.rabbitmq.host}:5672`,
  });
  const opts: Partial<MessageProperties> = {
    appId: "apigateway",
    correlationId: uuidv4(),
  };

  const order = { ...req.body };
  order.tosti_id = Number(order.tosti_id);

  try {
    const data = await client.clientRPCPublisher(queue, order, opts);

    res.status(201).send(data);
  } catch (err) {
    console.error(err);
    return err;
  }
});

export { ordersRouter };
