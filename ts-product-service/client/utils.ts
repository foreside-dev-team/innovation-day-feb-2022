import { MessagesClient } from "../proto/messages_grpc_pb";
import { credentials } from "grpc";

const port = 3001;

export const client = new MessagesClient(
    `localhost:${port}`,
    credentials.createInsecure()
);

export const noop = () => {};