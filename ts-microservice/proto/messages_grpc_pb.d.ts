// package: messages
// file: messages.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as messages_pb from "./messages_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IMessagesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getMessage: IMessagesService_IGetMessage;
    createMessage: IMessagesService_ICreateMessage;
    getMessages: IMessagesService_IGetMessages;
}

interface IMessagesService_IGetMessage extends grpc.MethodDefinition<messages_pb.MessageRequest, messages_pb.Message> {
    path: "/messages.Messages/GetMessage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<messages_pb.MessageRequest>;
    requestDeserialize: grpc.deserialize<messages_pb.MessageRequest>;
    responseSerialize: grpc.serialize<messages_pb.Message>;
    responseDeserialize: grpc.deserialize<messages_pb.Message>;
}
interface IMessagesService_ICreateMessage extends grpc.MethodDefinition<messages_pb.Message, google_protobuf_empty_pb.Empty> {
    path: "/messages.Messages/CreateMessage";
    requestStream: true;
    responseStream: false;
    requestSerialize: grpc.serialize<messages_pb.Message>;
    requestDeserialize: grpc.deserialize<messages_pb.Message>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IMessagesService_IGetMessages extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, messages_pb.Message> {
    path: "/messages.Messages/GetMessages";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<messages_pb.Message>;
    responseDeserialize: grpc.deserialize<messages_pb.Message>;
}

export const MessagesService: IMessagesService;

export interface IMessagesServer {
    getMessage: grpc.handleUnaryCall<messages_pb.MessageRequest, messages_pb.Message>;
    createMessage: grpc.handleClientStreamingCall<messages_pb.Message, google_protobuf_empty_pb.Empty>;
    getMessages: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, messages_pb.Message>;
}

export interface IMessagesClient {
    getMessage(request: messages_pb.MessageRequest, callback: (error: grpc.ServiceError | null, response: messages_pb.Message) => void): grpc.ClientUnaryCall;
    getMessage(request: messages_pb.MessageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: messages_pb.Message) => void): grpc.ClientUnaryCall;
    getMessage(request: messages_pb.MessageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: messages_pb.Message) => void): grpc.ClientUnaryCall;
    createMessage(callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<messages_pb.Message>;
    createMessage(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<messages_pb.Message>;
    createMessage(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<messages_pb.Message>;
    createMessage(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<messages_pb.Message>;
    getMessages(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<messages_pb.Message>;
    getMessages(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<messages_pb.Message>;
}

export class MessagesClient extends grpc.Client implements IMessagesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getMessage(request: messages_pb.MessageRequest, callback: (error: grpc.ServiceError | null, response: messages_pb.Message) => void): grpc.ClientUnaryCall;
    public getMessage(request: messages_pb.MessageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: messages_pb.Message) => void): grpc.ClientUnaryCall;
    public getMessage(request: messages_pb.MessageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: messages_pb.Message) => void): grpc.ClientUnaryCall;
    public createMessage(callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<messages_pb.Message>;
    public createMessage(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<messages_pb.Message>;
    public createMessage(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<messages_pb.Message>;
    public createMessage(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientWritableStream<messages_pb.Message>;
    public getMessages(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<messages_pb.Message>;
    public getMessages(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<messages_pb.Message>;
}
