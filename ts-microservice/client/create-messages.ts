import { Message } from "../proto/messages_pb";
import { client, noop } from "./utils";

export default function createNewMessages(messages: Message[]) {
  const stream = client.createMessage(noop);
  for (const message of messages) {
    stream.write(message);
  }
  stream.end();
}