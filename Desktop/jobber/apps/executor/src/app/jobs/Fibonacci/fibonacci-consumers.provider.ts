import { Injectable, OnModuleInit } from '@nestjs/common';
import { FibonacciMessage, PulsarClient } from '@jobber/pulsar';
import { PulsarConsumer } from '@jobber/pulsar';
import fibonacci from 'fibonacci';
import { Jobs } from '@jobber/nestjs';

@Injectable()
export class FibonacciConsumersProvider extends PulsarConsumer<FibonacciMessage> implements OnModuleInit {
    constructor(pulsarClient:PulsarClient){
        super(pulsarClient,Jobs.FIBONACCI)
    } 

  private count = 0;
  //PROUCER.SEND to (as backlog) this starts consuming from backlog!
  protected async onMessage(data: FibonacciMessage): Promise<void> { 
 
     console.log("onMessage fn invoked:FibonacciConsumersProvider!")
     const fiboFormattedData = fibonacci.iterate(data.iterations)
  
     fiboFormattedData.X = this.count += 1;
     console.log(fiboFormattedData)
  }

    
}
