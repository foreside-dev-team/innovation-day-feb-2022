import amqp, { Message, MessageProperties } from "amqplib";
import { EventEmitter } from "stream";
import { v4 as uuidv4 } from "uuid";
import { generateBuffer, parseBuffer } from "./helpers/buffer";
import { clientErrorHandler } from "./helpers/clientErrorHandler";
import { queueErrorHandler } from "./helpers/queueErrorHandler";

type RabbitMqOptions = {
  url: string;
  prefetch?: number;
};

export class RabbitMQClient {
  options: RabbitMqOptions;
  connection: any;
  prefetch: number;
  replyExtension = "amq.rabbitmq.reply-to";
  responseEmitter: EventEmitter;

  constructor(options: RabbitMqOptions) {
    this.options = options;
    this.prefetch = options.prefetch || 10;
    this.responseEmitter = new EventEmitter();
    this.responseEmitter.setMaxListeners(0);

    this.connection = amqp.connect(this.options.url);
  }

  public async createChannel(): Promise<any> {
    return await this.connection.then((con: { createChannel: () => any }) =>
      con.createChannel()
    );
  }

  public async close(): Promise<any> {
    this.connection.then((con: { close: () => any }) => con.close());
  }

  async pubSubConsumer<T>(
    exchange: string,
    handler: (msg: T) => void
  ) {
    // Create a channel
    const channel = await this.createChannel();
    
    channel.assertExchange(exchange, 'direct', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    });
     
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", exchange);
    channel.bindQueue(exchange, exchange, exchange);

    channel.consume(exchange, async function(msg: Message) {
      return handler(parseBuffer(msg.content));
    }, {
      noAck: true
    });
  }

  async clientRPCPublisher(
    queueName: string,
    payload: string | object,
    options: Partial<MessageProperties>
  ) {
    // Create a channel
    const channel = await this.createChannel();
    // Register the Respnse Consumer
    this.clientRPCResponseConsumer(queueName, channel);

    console.log("options: ", options);

    // Define our opts
    let opts = options || {};
    // Set our Request Options
    opts = {
      contentType: options?.contentType || `application/json`,
      contentEncoding: options?.contentEncoding
        ? options.contentEncoding.toUpperCase()
        : `UTF-8`,
      headers: options?.headers || {},
      deliveryMode: options?.deliveryMode || 1,
      priority: options?.priority || 0,
      correlationId: options?.correlationId || uuidv4(),
      replyTo: this.replyExtension,
      expiration: options?.expiration || undefined,
      messageId: options?.messageId || uuidv4(),
      timestamp: options?.timestamp || Math.floor(Date.now() / 1000),
      type: options?.type || `default.type`,
      userId: options?.userId || `guest`,
      appId: options?.appId || `default`,
      clusterId: options?.clusterId || `default`,
    };

    // Send the buffer to the queue, leave the channel open for the clientRPCResponseConsumer
    channel.sendToQueue(queueName, generateBuffer(payload), opts);

    // Return a Promise to resolve the response with a registered CorrelationId
    return new Promise((resolve, reject) => {
      // Try to emit the correlationId
      try {
        // Emit the coorelationId with the message
        return this.responseEmitter.once(opts.correlationId, (msg, err) => {
          if (err) {
            reject(new Error(err));
          }
          // Parse the msg.content
          const data = parseBuffer(msg.content);
          // Check if we have erorrs
          if (data.error) {
            reject(clientErrorHandler(data));
          }
          resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * @name clientRPCResponseConsumer
   * @description Create a channel to listen to a RPC Requests Response
   * @param {string} queueName
   */
  async clientRPCResponseConsumer(queueName: string, channel: any) {
    // Handle channel errors
    channel.on("error", (err: { toString: () => any }) => {
      console.error(`Channel Error`, err.toString());
      // Close the Channel
      channel.close();
    });
    // Listen to the Reply Queue
    channel.consume(
      this.replyExtension,
      (msg: any) => {
        // Reply received, emit that it has been received
        this.responseEmitter.emit(msg.properties.correlationId, msg);
        // Close the Channel
        channel.close();
      },
      {
        noAck: true,
      }
    );
  }

  /**
   * @name serverRPCConsumer
   * @description Method to receive messages from the queue and return the response on a response queue
   * @param queueName
   * @param handler
   */
  public async serverRPCConsumer(
    queueName: string,
    handler: (data: any, opts: amqp.MessageProperties) => void
  ) {
    // Create a channel
    const channel = await this.createChannel();
    // Create the Queue
    channel.assertQueue(queueName, {
      durable: false,
    });
    // Prefetch from the Queueu
    channel.prefetch(this.prefetch);

    // Consume the Queue
    channel.consume(queueName, async (msg: Message) => {
      // Check if we received a message
      if (msg.content === null) {
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
