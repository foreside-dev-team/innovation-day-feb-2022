import { resolve } from "path/posix";
import { Message, MessageRequest } from "../proto/messages_pb"
import { client } from './utils'

/* Use this method to get messages with a particular id.*/
export default function getMessages(id: number) {
    return new Promise<Message>((resolve, reject) => {
        const request = new MessageRequest();
        request.setId(id);

        client.getMessage(request, (err, message) => {
            if (err) reject(err);
            else resolve(message);
        });
    });
}