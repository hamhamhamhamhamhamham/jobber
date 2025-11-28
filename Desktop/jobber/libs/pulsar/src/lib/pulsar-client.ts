import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { Client, Consumer, Message, Producer} from "pulsar-client"
import { ConfigService} from "@nestjs/config"




// ✨ CONNECTION to SERVICE + DECLARATIONS
@Injectable()
export class PulsarClient implements OnModuleDestroy{
    // the docker PULSAR(out of kubernetes(minikube))
    // connect to PULSAR SERVICE(CLUSTER)
    private readonly client =new Client({
        serviceUrl:this.configService.getOrThrow<string>('PULSAR_SERVICE_URL') // .env which this class used/utilized > jobs
    })
    constructor(private readonly configService:ConfigService){
           console.log("FromPulsarClient constructor >",this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'))
    }
    private producers:Producer[] = []
    private consumers:Consumer[] = []
    async createProducer(topic:string){  
        const producer =await this.client.createProducer({ 
            blockIfQueueFull:true, // 🟡SIMULTANEOUS/asynchronous messages sending
            topic // topic : where messages stores , consumer refers to!
        })
        this.producers.push(producer)
        return producer
    }
    async createConsumer(topic:string,listener:(message:Message)=>void){
        const consumer=await this.client.subscribe({
            subscriptionType: 'Shared', // default is EXCLUSIVE 
            // subscriptionInitialPosition: "Earliest",
            topic,   
            subscription:"jobber", // SAME subscription name for all CONSUMERS     
            // how,THE WAT consumer recieves messages from topics; default: SHARED subscription->  MULTIPLE CONSUMERS (MESSAGES WILL be DISTRIBUTED for EACH CONSUMER will recieve portion of messages equally 25 25 25,...) -> SCALE OUR APP HORIZANATLLY : add as many as conumers and messages will distributed between them , so PROCESSING THEM QUICKER/ a ASYNC STRATEGY!

            //🟥👂🟥👂 IF SHARED subscription does not support build-in pulsar listener ->
            listener // for each ONLY NEW  message(producer DATA) auto invoked
        })
        // Start virtual-listener loop
        // this.startListenerLoop(consumer, listener);

        this.consumers.push(consumer)
        return consumer
    }

    ////🟥👂🟥👂 custom listener definition as it is SHARED type SUBSCRIPTION! which will fire listener fn in PulsarConsumer as before! 
//     private async startListenerLoop(consumer: Consumer, listener: (msg: Message) => Promise<void>) {
//     (async () => {
//         while (true) {
//             try {
//                 const msg = await consumer.receive();
//                 await listener(msg);

//             } catch (err) {
//                 console.error("Listener loop error", err);
//             }
//         }
//     })();
// }

    // close PULSAR SERVICE connection when closing app;
    async onModuleDestroy() {
        for (const item of this.producers) {
           await item.close()
        }
        await this.client.close()
    }     

}