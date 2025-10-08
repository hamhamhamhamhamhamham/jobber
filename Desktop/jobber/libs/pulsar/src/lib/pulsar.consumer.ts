import { Consumer, Message } from "pulsar-client";
import { PulsarClient } from "./pulsar-client";
import { deserialize } from "@jobber/pulsar";
import { Logger } from "@nestjs/common";





export abstract class PulsarConsumer<T>{
    protected logger = new Logger()
    private consumer!:Consumer;
    constructor(
        private readonly pulsarClient:PulsarClient,
        private readonly topic:string
    ){}
    async onModuleInit(){
        console.log("onModuleInit:PulsarConsumer-abstract Class!")
        this.consumer = await this.pulsarClient.createConsumer(
            this.topic,
            this.listener.bind(this)  // ALWAYS this keyword refres to the class when calling this message, and not undefined
        )
    }
    
    protected async listener(message:Message){ // LISTENER WILL BE IVOKED for new message
         try{
            const data=  deserialize<T>(message.getData())
            this.logger.debug(`${JSON.stringify(data)} Recieved Message PulsarConsumer:listener`)
            await this.onMessage(data)   // add new block code!
         }catch(err){
            this.logger.error(`error occured PulsarConsumer:listener ${err}`)
         }
         finally{  
            await this.consumer.acknowledge(message) 
         }
     }


    protected abstract onMessage(data:T):Promise<void> // ABSTRACT > implement  in child


}