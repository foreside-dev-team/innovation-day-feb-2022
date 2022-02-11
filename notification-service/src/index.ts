import { RabbitMQClient } from "../services/rabbitmq/amqp-client";
import express from 'express';
import { config } from "./config";
import sendgridMail from '@sendgrid/mail';
import { Order, Product } from "./interfaces/interfaces";

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY as string)

const rabbitMqClient = new RabbitMQClient({
    url: `amqp://${config.rabbitmq.host}:5672`,
});

const createOrderHandler = async (order:  Order) => {
    // Check if we have a message
    if (order === null) {
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

    const product: Product = await rabbitMqClient.clientRPCPublisher('products', { tostiId: order.toastyid }, {}) as Product;
    
    const msg: sendgridMail.MailDataRequired = {
        to: 'tosti@foreside.nl', // Change to your recipient
        from: 'steven.van.den.hout@foreside.nl', // Change to your verified sender
        replyTo: order.customeremail,
        subject: `Make toastie {${order.orderid}}`,
        html: `
            <strong>Make me a ${product.name} tosti please toasti master! ${order.customeremail} needs it ASAP</strong>
            </br>
            <p>The toasty has:</p>
            <ul>
                ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`)}
            </ul>
        `,
    }
 
    try {        
        sendgridMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
        return order;
    } catch (err) {
      throw err;
    }
};

rabbitMqClient.clientRPCsubscriber('orderCreated', createOrderHandler);

/**
 * Express server
 */
const port = 9999; // port to listen
// Create a new express app instance
const app: express.Application = express();
const actuator = require('express-actuator');

app.use(actuator())
let httpServer = require("http").Server(app);

app.get('/', async function (req, res) {
    const product: Product = await rabbitMqClient.clientRPCPublisher('products', { tostiId: 1 }, {}) as Product;
    
    res.send(`product: ${JSON.stringify(product)}`);
});

const server = httpServer.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
});
