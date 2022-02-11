import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RabbitMQClient } from "../../services/rabbitmq/amqp-client";
import { config } from "../../config";
import { MessageProperties } from "amqplib";

const testRouter = Router();
const queue = "test-queue";

testRouter.get("/", async (request: Request, response: Response) => {
  const client = new RabbitMQClient({
    url: `amqp://${config.rabbitmq.host}:5672`,
  });
  const opts: Partial<MessageProperties> = {
    appId: "apigateway",
    correlationId: uuidv4(),
  };

  console.log("Publish RPC Message to queue");
  try {
    const data = await client.clientRPCPublisher(
      queue,
      {
        hello: "world!",
      },
      opts
    );

    console.log("Received RPC Message from service via the queue", data);
    response.send(data);
  } catch (err) {
    console.error(err);
    return err;
  }
});

export { testRouter };
