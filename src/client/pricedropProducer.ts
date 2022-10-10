import config from 'config';
import Producer from './KafkaProducer';
import _ from 'lodash';

export type IPriceDropRowData = {
    tag: string;
    catalogue_name: string;
    sku_id: string;
    deal_price: number;
    moq: number;
    commission_percent: number;
    campaign_name: string;
    campaign_type: string;
    campaign_description: string;
    coupon_code: string;
    is_active: boolean;
    start_time: string;
    end_time: string;
    priority: number;
    clubbing_key: string;
    use_case_filter: string;
    min_cart_value: number;
    disallowed_tags: string[];
};

export type IPriceDropPayload = {
    admin_id: string;
    file_id: string;
    row_data: IPriceDropRowData;
};

export type IPriceDropCommand = {
    type: string;
    payload: IPriceDropPayload;
};

let producer: Producer<IPriceDropCommand>;

export const send = async (command: IPriceDropCommand) => {
    if (!producer) {
        producer = new Producer(config.get('KAFKA_BROKERS'), config.get('PRICE_DROP_TOPIC'));
    }
    await producer.sendSingleMessage(command);
};

export const sendMultipleMessages = async (commands: IPriceDropCommand[]) => {
    if (!producer) {
        producer = new Producer(config.get('KAFKA_BROKERS'), config.get('PRICE_DROP_TOPIC'));
    }
    await producer.send(commands);
};

export const sendWithPartitioner = async (commands: IPriceDropCommand[], partitionerPath: string) => {
    if (!producer) {
        producer = new Producer(config.get('KAFKA_BROKERS'), config.get('PRICE_DROP_TOPIC'));
    }
    await producer.sendWithPartitioner(commands, partitionerPath);
};
