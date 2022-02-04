import { Router, Request, Response } from "express";
import { RabbitMQClient } from "../../services/rabbitmq/amqp-client";

const testRouter = Router();

testRouter.get("/", async (request: Request, response: Response) => {
  const client = new RabbitMQClient({ url: "amqp://localhost:5672" });
  const channel = await client.createChannel();

  console.log("channel", channel);

  const queue = "test-queue";
  const message = "test message adrian";

  await channel.assertQueue(queue, {
    durable: false,
  });

  const sendToQueue = await channel.sendToQueue(queue, Buffer.from(message));
  console.log("sendToQueue", sendToQueue);

  // const closeChannel = await channel.close();
  // console.log("closeChannel: ", closeChannel);

  // const closeConnection = await client.close();
  // console.log("closeConnection: ", closeConnection);

  response.send("test");
});

export { testRouter };
