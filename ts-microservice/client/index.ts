import { Message } from "../proto/messages_pb";
import getMessage from "./get-message";
import createMessages from "./create-messages";
import allMessages from "./all-messages";

async function run() {
    const message = await getMessage(1);
    console.log(message.toString());

    const mes1 = new Message();
    mes1.setId(20);
    mes1.setTitle("Topic1");
    mes1.setBody("You have arrived at Foreside");
    createMessages([mes1]);
    console.log(`\nCreated message ${mes1.toString()}`);

    const messages = await allMessages();
    console.log(`\nListing all ${messages.length} messages`);
    for (const message of messages) {
        console.log(message.toString());
    }
}

run();