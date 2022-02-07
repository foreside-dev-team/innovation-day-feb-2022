import { Server, ServerCredentials } from "grpc";
import { MessagesService } from "../proto/messages_grpc_pb";
import { MessageServer } from "./services";

//Instantiate the gRPC server.
const server = new Server();
server.addService(MessagesService, new MessageServer());
const port = 3001;
const url = `localhost:${port}`;
console.log(`Listening on ${url}`);
server.bind(url, ServerCredentials.createInsecure());

server.start();

