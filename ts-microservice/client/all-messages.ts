import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { Message } from "../proto/messages_pb";
import { client } from "./utils";

export default function allUsers() {
  return new Promise<Message[]>((resolve, reject) => {
    const stream = client.getMessages(new Empty());
    const messages: Message[] = [];
    stream.on("data", (message) => messages.push(message));
    stream.on("error", reject);
    stream.on("end", () => resolve(messages));
  });
}