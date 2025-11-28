
import { PulsarClient, serialize } from "@jobber/pulsar";
import { Producer } from "pulsar-client";
import {plainToInstance} from "class-transformer"
import { validate} from "class-validator"
import { ApolloError } from 'apollo-server-express';
import { BadRequestException, Logger } from "@nestjs/common";

// can not be initialized extendable
export abstract class AbstractJob<T extends object>{ //extends object > validateData
    private readonly logger= new Logger(AbstractJob.name) // console logger!!!!
  
    //❗ VALIDATION constructor
    protected abstract classConstructorForValidation:new () => T;
    // DI constructor
    constructor(private readonly pulsarClient:PulsarClient){}
    private producer:Producer;
    async execute(data:T,jobName:string){
      console.log("execute fn inside AbstractJob class invoked to generate Producer&messages!")
       // ✔️ await to all data valiadated then proceed! 
       //👌🏻 THEN(+ LINE AFTER IT runs doesn't matter😁) == AWAIT(LINES AFTER IT WON'T run )
       //👍🏻(method 2) this.validate(data).then(()=>this.producer.send({data:serialize}))
       await this.validateData(data) 
      
      //🅿️ulsar is like database : {"jobName": []} 
        if(!this.producer){ // can use onModuleInit instead : one Definition and multiple use
            this.producer = await this.pulsarClient.createProducer(jobName) //🅿️GENERATE PRODUCER(which is on a topic) 
        }
       // ⚠️ all data sent as BACKLOGS to pulsar(producer.send) so fast , but processed one by one by consumer(s)
        if(Array.isArray(data)){
         
          for(const message of data){
            //❌await>in order   🟡SIMULTANEOUS messages sending to PULSAR
             this.send(message)
          }
          return
        }
        //❌ await
         this.send(data)
    }

    private send(data:T){
      
      //❌ await this.producer.send({data:serialize(data)})
      this.producer.send({data:serialize(data)}).then(() => this.logger.debug('Message sent Pulsar Successfully'))
        .catch(err => this.logger.error('Send failed Pulsar', err));
      // aftervalidating whole data(array or obj) Then sending starts!
      //  this.validateData(data).then(()=> this.producer.send({data:serialize(data)}) )
       //🅿️Producer Data:MESSAGE(then auto invokes Consumer LISTENER(message) fn(onMessage) which recieves this DATA as input which is SERIALIZED;
    }
  private async validateData(data: T | T[]) {
  console.log("VALIDATIONS");
  if (Array.isArray(data)) {    // array (of objects)
    for (const item of data) {
      const instance = plainToInstance(this.classConstructorForValidation, item);
      const errors = await validate(instance);

      if (errors.length) {   //❗ in both  cases error is shown in CMD server & not in graphql playground!!! 
        throw new ApolloError(
    `invalid value for data item: ${JSON.stringify(errors)}`,
  'VALIDATION_ERROR'
    );
        throw new BadRequestException(
          `invalid value for data item > ${JSON.stringify(errors)}`
        );
        
      }
    }
  } else {  // not array(obj)
    const instance = plainToInstance(this.classConstructorForValidation, data);
    const errors = await validate(instance);

    if (errors.length) {
      
      throw new ApolloError(
  `invalid value for data item: ${JSON.stringify(errors)}`,
  'VALIDATION_ERROR')


      throw new BadRequestException(
        `invalid value for data Object > ${JSON.stringify(errors)}`
      );
    }
  }
}
  } 