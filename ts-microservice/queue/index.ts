import { Message } from "amqplib";
import { RabbitMQClient } from "../rabbitmq/amqp-client";
import { config } from "../config";

const queue = "orders";
const client = new RabbitMQClient({
  url: `amqp://${config.rabbitmq.host}:5672`,
});
const handler = async (content: Message["content"]) => {
  // Check if we have a message
  if (content === null) {
    return {
      error: true,
      statusCode: 500,
      message: "Queue message is empty",
      details: [
        {
          code: 100,
          message: "Queue message is empty",
        },
      ],
    };
  }
  try {
    
    console.log("Received message from RPC Queue: ", content);

    console.log("Publish RPC Response Message to Reply queue");
    return { hello: "Back!" };
  } catch (err) {
    throw err;
  }
};

client.serverRPCConsumer(queue, handler);
