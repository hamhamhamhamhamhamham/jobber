
import { PulsarClient, serialize } from "@pulsar-lib";
import { Producer } from "pulsar-client";
import {plainToInstance} from "class-transformer"
import {validate} from "class-validator"

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
        await this.producer.send({data:serialize(data)}) //🅿️Producer Data:MESSAGE(then auto invokes Consumer LISTENER(message) fn(onMessage) which recieves this DATA as input which is SERIALIZED;
    }

    private async validateData(data:T){
      console.log("VALIDATIONS")
      const errors = await validate(plainToInstance(this.classConstructorForValidation,data)) 
      if(errors.length){
        throw new BadRequestException(`invalid value for data Object > : ${JSON.stringify(errors)}`)
      }
    }
  } 