import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RabbitMQClient } from "../../services/rabbitmq/amqp-client";

const testRouter = Router();
const queue = "test-queue";

testRouter.get("/", async (request: Request, response: Response) => {
  const client = new RabbitMQClient({ url: "amqp://localhost:5672" });
  const opts = {
    appId: "API Gateway",
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
