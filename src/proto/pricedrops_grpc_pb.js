// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var pricedrops_pb = require('./pricedrops_pb.js');

function serialize_pricedrop_query_proto_ApplyPriceDropReq(arg) {
  if (!(arg instanceof pricedrops_pb.ApplyPriceDropReq)) {
    throw new Error('Expected argument of type pricedrop_query_proto.ApplyPriceDropReq');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pricedrop_query_proto_ApplyPriceDropReq(buffer_arg) {
  return pricedrops_pb.ApplyPriceDropReq.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pricedrop_query_proto_ApplyPriceDropResp(arg) {
  if (!(arg instanceof pricedrops_pb.ApplyPriceDropResp)) {
    throw new Error('Expected argument of type pricedrop_query_proto.ApplyPriceDropResp');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pricedrop_query_proto_ApplyPriceDropResp(buffer_arg) {
  return pricedrops_pb.ApplyPriceDropResp.deserializeBinary(new Uint8Array(buffer_arg));
}


var PriceDropQueryServiceService = exports.PriceDropQueryServiceService = {
  applyPriceDrops: {
    path: '/pricedrop_query_proto.PriceDropQueryService/ApplyPriceDrops',
    requestStream: false,
    responseStream: false,
    requestType: pricedrops_pb.ApplyPriceDropReq,
    responseType: pricedrops_pb.ApplyPriceDropResp,
    requestSerialize: serialize_pricedrop_query_proto_ApplyPriceDropReq,
    requestDeserialize: deserialize_pricedrop_query_proto_ApplyPriceDropReq,
    responseSerialize: serialize_pricedrop_query_proto_ApplyPriceDropResp,
    responseDeserialize: deserialize_pricedrop_query_proto_ApplyPriceDropResp,
  },
};

exports.PriceDropQueryServiceClient = grpc.makeGenericClientConstructor(PriceDropQueryServiceService);
