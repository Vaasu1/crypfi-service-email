/* eslint-disable no-unused-vars,no-async-promise-executor */
import { Kafka } from 'kafkajs';
import * as Interface from '../src/api/interfaces/interface';
import { KAFKA_EVENTS_TYPES } from '../constant/events';
import KafkaHelperConsume from '../src/api/modules/mail/kafka/consumer.helper';

class KafkaHelper {
  private kafka;

  private producer;

  private consumer;
  private randomId = Math.floor(Math.random() * 10 + 1);
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      const kafkaCrednetials: Interface.kafkaCrednetials = {
        brokers: [String(process.env.KAFKA_BROKER)]
      };
      this.kafka = new Kafka(kafkaCrednetials);
      this.connectProducer();
      this.connectConsumer().then((res) => {
        console.log('Kafka connection', res);
        this.consumeMessages();
      });
      return this.kafka;
    } catch (err: any) {
      console.log('Error in connection kafka:', err);
    }
  }

  connectProducer = async () => {
    this.producer = this.kafka.producer();
    await this.producer.connect();
    return true;
  };

  connectConsumer = async () => {
    this.consumer = this.kafka.consumer({
      groupId: `consumer_email_service_${process.env.HOST_NAME}_${this.randomId}`,
      maxWaitTimeInMs: 100
    });
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: KAFKA_EVENTS_TYPES.NOTIFICATION,
      fromBeginning: false
    });
  };
  

  public async produceMessage(topic: string, messageData: any = []) {
    const finalyData: Array<Object> = [];
    messageData.forEach((element) => {
      finalyData.push({ value: JSON.stringify(element) });
    });
    await this.producer.send({
      topic,
      messages: finalyData
    });
  }

  public async consumeMessage(
    topicName: string,
    fromBeginning: boolean = false
  ) {
    const random = Math.random();
    return new Promise(async (resolve, reject) => {
      return resolve(this.consumer);
    });
  }

  public async consumeMessages() {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: any) => {
        switch (topic) {
          case KAFKA_EVENTS_TYPES.NOTIFICATION:
            KafkaHelperConsume.createNotification(JSON.parse(message.value));
            break;
          default:
            return true;
        }
        return true;
      }
    });
    return true;
  }
}

export default new KafkaHelper();
