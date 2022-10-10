import config from 'config';
import { Admin, Kafka, Message, Producer, Partitioners } from 'kafkajs';
import _ from 'lodash';

export default class KafkaProducer<T> {
    kafka: Kafka;
    admin: Admin;
    producer: Producer;
    topic: string;
    private isConnected: boolean;

    constructor(brokers: string, topic: string) {
        this.kafka = new Kafka({
            connectionTimeout: 5000,
            authenticationTimeout: 5000,
            clientId: 'product-store',
            brokers: brokers.split(','),
            ...(config.get('APP_ENV') === 'production'
                ? {
                      ssl: true,
                      sasl: {
                          mechanism: 'scram-sha-512',
                          username: config.get('KAFKA_USERNAME'),
                          password: config.get('KAFKA_PASSWORD'),
                      },
                  }
                : {}),
        });

        this.admin = this.kafka.admin();

        this.topic = topic;
        this.producer = this.kafka.producer({
            createPartitioner: Partitioners.JavaCompatiblePartitioner,
            maxInFlightRequests: 5,
            retry: {
                initialRetryTime: 100,
                retries: 8,
            },
        });
        this.isConnected = false;
    }

    async connect(): Promise<void> {
        await this.admin.connect();
        const topics = await this.admin.listTopics();
        if (topics.indexOf(this.topic) === -1) {
            await this.admin.createTopics({
                waitForLeaders: true,
                topics: [{ topic: this.topic }],
            });
        }

        await this.producer.connect();
        console.log(`Connected to kafka!`);
        this.isConnected = true;
    }

    async send(messages: T[]): Promise<void> {
        if (!this.isConnected) await this.connect();
        try {
            await this.producer.send({
                topic: this.topic,
                messages: messages.map((message) => ({
                    value: JSON.stringify(message),
                })),
                acks: -1,
            });
        } catch (e: any) {
            if (e.message === 'The producer is disconnected') {
                this.isConnected = false;
            }
            console.error('ERR_PRODUCER_SEND:', e);
        }
    }

    async sendRaw(messages: Message[]): Promise<void> {
        if (!this.isConnected) await this.connect();
        try {
            await this.producer.send({
                topic: this.topic,
                messages,
                acks: -1,
            });
        } catch (e: any) {
            if (e.message === 'The producer is disconnected') {
                this.isConnected = false;
            }
            console.error('ERR_PRODUCER_SEND_RAW:', e);
        }
    }

    async sendSingleMessage(message: T) {
        if (!this.isConnected) {
            await this.connect();
        }

        try {
            await this.producer.send({
                topic: this.topic,
                messages: [{ value: JSON.stringify(message) }],
                acks: -1,
            });
        } catch (e: any) {
            if (e.message === 'The producer is disconnected') {
                this.isConnected = false;
            }
            console.log('ERR_PRODUCER_SINGLE_MSG:', e);
        }
    }

    /**
     * Send messages in a topic to specific partitions on the basis of the partitioner path.
     *
     * @param messages Data to send to kafka topic.
     * @param partitionerPath Path to a field in the messages, which will be be used to decide in which partitions each message has to be sent to.
     * @return Returns a promise
     */
    async sendWithPartitioner(messages: T[], partitionerPath: string): Promise<void> {
        if (!this.isConnected) await this.connect();
        try {
            await this.producer.send({
                topic: this.topic,
                messages: messages.map<Message>((message) => ({
                    value: JSON.stringify(message),
                    key: _.get(message, partitionerPath)?.toString(),
                })),
                acks: -1,
            });
        } catch (e: any) {
            if (e.message === 'The producer is disconnected') {
                this.isConnected = false;
            }
            console.log('ERR_PRODUCER_SEND_PART:', e);
        }
    }
}
