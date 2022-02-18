
import { Message } from "amqplib";
import { RabbitMQClient } from "../services/rabbitmq/amqp-client";
import { config } from "../config";
import { ProductHandler } from "../handler/products";

const queue = "products";
const client = new RabbitMQClient({
  url: `amqp://${config.rabbitmq.host}:5672`,
});

const productHandler = new ProductHandler();

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

    try {
      const productId = (content as any).tostiId;
      console.log("productId", productId);
      const product = await productHandler.getById(productId);
      console.log(product);
      return product ? product : "Product has not been found";
    }catch(e){
      console.log(e);
      return {"error": "something has gone wrong"};
    }

  } catch (err) {
    throw err;
  }
};

client.serverRPCConsumer(queue, handler);
