import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { handleUnaryCall, handleClientStreamingCall, handleServerStreamingCall, ServerUnaryCall, ServiceError, sendUnaryData, ServerWritableStream, ServerReadableStream } from "grpc";
import { IMessagesServer } from "../proto/messages_grpc_pb";
import { MessageRequest, Message } from "../proto/messages_pb";

const messages = require('./db');

export class MessageServer implements IMessagesServer {
    getMessage(call: ServerUnaryCall<MessageRequest>, callback: sendUnaryData<Message>) {
        const messageId = call.request.getId();
        const message = messages.find((m: Message) => m.getId() === messageId);
        if (!message) {
            const error: ServiceError = {
                name: "Message Missing",
                message: `Message with ID ${messageId} does not exist.`,
            };
            callback(error, null);
            return;
        }

        console.log(`getmessage: returning ${message.getBody()} (id: ${message.getId()}).`);
        callback(null, message);
    }

    getMessages(call: ServerWritableStream<Empty>) {
        console.log(`getMessages: streaming all messages.`);
        for (const message of messages) call.write(message);
        call.end();
    }

    createMessage(
        call: ServerReadableStream<Empty>,
        callback: sendUnaryData<Empty>
    ) {
        console.log(`createMessages: creating new messages from stream.`);

        let messageCount = 0;

        call.on("data", (u) => {
            messageCount++;
            messages.push(u);
        });

        call.on("end", () => {
            console.log(`Created ${messageCount} new message(s).`);
            callback(null, new Empty());
        });
    }
}