import { Message } from "../proto/messages_pb";

export function messageToClass({id, title, body} :Message.AsObject ) {
    const message = new Message();
    message.setId(id);
    message.setTitle(title);
    message.setBody(body);
    return message;
}

//Mock a database with 2 already loaded messages.
export const messages: Message[] = [
    {id: 1, title: "MyTestMessage", body: "Adrian is amazing"},
    {id: 2, title: "MyTestMessage2", body: "Foreside power!"}
].map(messageToClass);