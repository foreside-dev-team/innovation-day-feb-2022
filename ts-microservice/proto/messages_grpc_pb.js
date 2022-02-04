// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var messages_pb = require('./messages_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messages_Message(arg) {
  if (!(arg instanceof messages_pb.Message)) {
    throw new Error('Expected argument of type messages.Message');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messages_Message(buffer_arg) {
  return messages_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_messages_MessageRequest(arg) {
  if (!(arg instanceof messages_pb.MessageRequest)) {
    throw new Error('Expected argument of type messages.MessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_messages_MessageRequest(buffer_arg) {
  return messages_pb.MessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var MessagesService = exports.MessagesService = {
  getMessage: {
    path: '/messages.Messages/GetMessage',
    requestStream: false,
    responseStream: false,
    requestType: messages_pb.MessageRequest,
    responseType: messages_pb.Message,
    requestSerialize: serialize_messages_MessageRequest,
    requestDeserialize: deserialize_messages_MessageRequest,
    responseSerialize: serialize_messages_Message,
    responseDeserialize: deserialize_messages_Message,
  },
  createMessage: {
    path: '/messages.Messages/CreateMessage',
    requestStream: true,
    responseStream: false,
    requestType: messages_pb.Message,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_messages_Message,
    requestDeserialize: deserialize_messages_Message,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  getMessages: {
    path: '/messages.Messages/GetMessages',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: messages_pb.Message,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_messages_Message,
    responseDeserialize: deserialize_messages_Message,
  },
};

exports.MessagesClient = grpc.makeGenericClientConstructor(MessagesService);
