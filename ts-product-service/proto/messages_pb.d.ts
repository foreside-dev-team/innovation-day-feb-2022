// package: messages
// file: messages.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Message extends jspb.Message { 
    getId(): number;
    setId(value: number): Message;
    getTitle(): string;
    setTitle(value: string): Message;
    getBody(): string;
    setBody(value: string): Message;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Message.AsObject;
    static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Message;
    static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
    export type AsObject = {
        id: number,
        title: string,
        body: string,
    }
}

export class MessageRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): MessageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MessageRequest): MessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MessageRequest;
    static deserializeBinaryFromReader(message: MessageRequest, reader: jspb.BinaryReader): MessageRequest;
}

export namespace MessageRequest {
    export type AsObject = {
        id: number,
    }
}
