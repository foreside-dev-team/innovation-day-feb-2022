import amqp from "amqplib";
import { generateBuffer, parseBuffer } from "./helpers/buffer";

type RabbitMqOptions = {
  url: string;
  prefetch?: number;
};

interface RabbitMqMessage {}

interface RabbitMqMessageProperties {
  contentType: string;
  contentEncoding: string;
  headers: any;
  deliveryMode: number;
  priority: 0;
  correlationId: string;
  replyTo: string;
  expiration: number;
  messageId: string;
  timestamp: number;
  type: string;
  userId: string;
  appId: string;
}

export class RabbitMQClient {
  options: RabbitMqOptions;
  connection: any;
  prefetch: number;

  constructor(options: RabbitMqOptions) {
    this.options = options;
    this.connection = amqp.connect(this.options.url);
    this.prefetch = options.prefetch || 10;
  }

  public async createChannel(): Promise<any> {
    return await this.connection.then((con: { createChannel: () => any }) =>
      con.createChannel()
    );
  }

  public async close(): Promise<any> {
    this.connection.then((con: { close: () => any }) => con.close());
  }

  public async serverRPCConsumer(queueName: string, handler: () => void) {
    // Create a channel
    const channel = await this.createChannel();
    // Create the Queue
    channel.assertQueue(queueName, {
      durable: false,
    });
    // Prefetch from the Queueu
    channel.prefetch(this.prefetch);

    // Consume the Queue
    channel.consume(queueName, async (msg: RabbitMqMessageProperties) => {
      // Check if we received a message
      if (msg === null) {
        // Create the Error payload
        const payload = {
          error: true,
          statusCode: 400,
          message: `Queue error: 'message' is empty`,
          details: [
            {
              type: 101,
              name: "Queue message empty",
            },
          ],
        };
        // Send the processed request to the Reponse Queue
        channel.sendToQueue(
          msg.properties.replyTo,
          generateBuffer(payload),
          msg.properties
        );
        // Acknowledge the message
        channel.ack(msg);
      }

      // Parse the Buffer
      const data = parseBuffer(msg.content.toString());

      try {
        // Wait until the passed in handler-function has run
        const payload = await handler(data, msg.properties);
        // Send the processed request to the Reponse Queue
        channel.sendToQueue(
          msg.properties.replyTo,
          generateBuffer(payload),
          msg.properties
        );
        // Acknowledge the message
        channel.ack(msg);
      } catch (err) {
        // Get the Queue Error
        const payload = queueErrorHandler(err);
        // Send the processed error to the Reponse Queue
        channel.sendToQueue(
          msg.properties.replyTo,
          generateBuffer(payload),
          msg.properties
        );
        // Acknowledge the message
        channel.ack(msg);
      }
    });
  }
}
