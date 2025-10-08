
import { PulsarClient, serialize } from "@jobber/pulsar";
import { Producer } from "pulsar-client";
import {plainToInstance} from "class-transformer"
import { validate} from "class-validator"

import { BadRequestException } from "@nestjs/common";
// can not be initialized extendable
export abstract class AbstractJob<T extends object>{ //extends object > validateData
    //❗ VALIDATION constructor
    protected abstract classConstructorForValidation:new () => T;
    // DI constructor
    constructor(private readonly pulsarClient:PulsarClient){}
    private producer:Producer;
    async execute(data:T,jobName:string){
      console.log("execute fn inside AbstractJob class invoked to generate Producer&messages!")
      await this.validateData(data)
      //🅿️ulsar is like database : {"jobName": []} 
        if(!this.producer){ // can use onModuleInit instead : one Definition and multiple use
            this.producer = await this.pulsarClient.createProducer(jobName) //🅿️GENERATE PRODUCER(which is on a topic) 
        }
      


        
        if(Array.isArray(data)){
          for(const message of data){
            await this.send(message)
          }
          return
        }
        await this.send(data)
    }

    async send(data:T){
      await this.producer.send({data:serialize(data)}) //🅿️Producer Data:MESSAGE(then auto invokes Consumer LISTENER(message) fn(onMessage) which recieves this DATA as input which is SERIALIZED;
    }
    private async validateData(data: T | T[]) {
  console.log("VALIDATIONS");
  if (Array.isArray(data)) {
    for (const item of data) {
      const instance = plainToInstance(this.classConstructorForValidation, item);
      const errors = await validate(instance);

      if (errors.length) {
        throw new BadRequestException(
          `invalid value for data item > ${JSON.stringify(errors)}`
        );
      }
    }
  } else {
    const instance = plainToInstance(this.classConstructorForValidation, data);
    const errors = await validate(instance);

    if (errors.length) {
      throw new BadRequestException(
        `invalid value for data Object > ${JSON.stringify(errors)}`
      );
    }
  }
}
  } 