import * as grpc from '@grpc/grpc-js';
import config from 'config';
import { PriceDropQueryServiceClient } from '../proto/pricedrops_grpc_pb';

export default new PriceDropQueryServiceClient(
    `${config.get('GRPC_HOST')}:${config.get('GRPC_PORT')}`,
    grpc.credentials.createInsecure(),
);
