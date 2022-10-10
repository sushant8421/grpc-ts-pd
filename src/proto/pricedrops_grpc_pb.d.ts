// package: pricedrop_query_proto
// file: pricedrops.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as pricedrops_pb from "./pricedrops_pb";

interface IPriceDropQueryServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    applyPriceDrops: IPriceDropQueryServiceService_IApplyPriceDrops;
}

interface IPriceDropQueryServiceService_IApplyPriceDrops extends grpc.MethodDefinition<pricedrops_pb.ApplyPriceDropReq, pricedrops_pb.ApplyPriceDropResp> {
    path: "/pricedrop_query_proto.PriceDropQueryService/ApplyPriceDrops";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<pricedrops_pb.ApplyPriceDropReq>;
    requestDeserialize: grpc.deserialize<pricedrops_pb.ApplyPriceDropReq>;
    responseSerialize: grpc.serialize<pricedrops_pb.ApplyPriceDropResp>;
    responseDeserialize: grpc.deserialize<pricedrops_pb.ApplyPriceDropResp>;
}

export const PriceDropQueryServiceService: IPriceDropQueryServiceService;

export interface IPriceDropQueryServiceServer extends grpc.UntypedServiceImplementation {
    applyPriceDrops: grpc.handleUnaryCall<pricedrops_pb.ApplyPriceDropReq, pricedrops_pb.ApplyPriceDropResp>;
}

export interface IPriceDropQueryServiceClient {
    applyPriceDrops(request: pricedrops_pb.ApplyPriceDropReq, callback: (error: grpc.ServiceError | null, response: pricedrops_pb.ApplyPriceDropResp) => void): grpc.ClientUnaryCall;
    applyPriceDrops(request: pricedrops_pb.ApplyPriceDropReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pricedrops_pb.ApplyPriceDropResp) => void): grpc.ClientUnaryCall;
    applyPriceDrops(request: pricedrops_pb.ApplyPriceDropReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pricedrops_pb.ApplyPriceDropResp) => void): grpc.ClientUnaryCall;
}

export class PriceDropQueryServiceClient extends grpc.Client implements IPriceDropQueryServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public applyPriceDrops(request: pricedrops_pb.ApplyPriceDropReq, callback: (error: grpc.ServiceError | null, response: pricedrops_pb.ApplyPriceDropResp) => void): grpc.ClientUnaryCall;
    public applyPriceDrops(request: pricedrops_pb.ApplyPriceDropReq, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: pricedrops_pb.ApplyPriceDropResp) => void): grpc.ClientUnaryCall;
    public applyPriceDrops(request: pricedrops_pb.ApplyPriceDropReq, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: pricedrops_pb.ApplyPriceDropResp) => void): grpc.ClientUnaryCall;
}
