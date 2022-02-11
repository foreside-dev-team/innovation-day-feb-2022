import { RabbitMQClient } from "../services/rabbitmq/amqp-client";
import express from 'express';
import { config } from "./config";
import sendgridMail from '@sendgrid/mail';
import { Order, Product } from "./interfaces/interfaces";

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY as string)

const rabbitMqClient = new RabbitMQClient({
    url: `amqp://${config.rabbitmq.host}:5672`,
});

const sendMsg = (msg: sendgridMail.MailDataRequired) => {
    try {        
        return sendgridMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    } catch (err) {
      throw err;
    }
}

const createOrderHandler = async (order:  Order) => {
    if (order == null) {
        return new Error('order is null')
    }

    console.log('order', order);

    
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

    const product: Product | 'Product has not been found' = await rabbitMqClient.clientRPCPublisher('products', { tostiId: order.tosti_id }, {}) as Product | 'Product has not been found';

    if (product === 'Product has not been found') {
        return sendMsg({
            to: order.customer_email,
            from: 'steven.van.den.hout@foreside.nl', // Change to your verified sender
            replyTo: 'tosti@foreside.nl',
            subject: `What did you just order?!?!?`,
            html: `
                <strong>You chose poorly!</strong>
                </br>
                <p>This tosti does not exist</p>
            `,
        });
    }
    
    sendMsg({
        to: 'robert.lenders@foreside.nl', // Change to your recipient
        from: 'steven.van.den.hout@foreside.nl', // Change to your verified sender
        replyTo: order.customer_email,
        subject: `Make toastie {${order.order_id}}`,
        html: `
            <strong>Make me a ${product.name} tosti please toasti master! ${order.customer_email} needs it ASAP</strong>
            </br>
            <p>The toasty has:</p>
            <ul>
                ${product.ingredients.map(ingredient => `<li>${ingredient.name}</li>`)}
            </ul>
        `,
    });

    sendMsg({
        to: order.customer_email, // Change to your recipient
        from: 'steven.van.den.hout@foreside.nl', // Change to your verified sender
        replyTo: 'robert.lenders@foreside.nl',
        subject: `Make toastie {${order.order_id}}`,
        html: `
            <strong>You have ordered ${product.name} from toasti master! it will come ASAP</strong>
            </br>
            <p>The toasty has:</p>
            <ul>
                ${product.ingredients.map(ingredient => `<li>${ingredient.name}</li>`)}
            </ul>
        `,
    });
};

rabbitMqClient.pubSubConsumer('orderCreated', createOrderHandler);

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
