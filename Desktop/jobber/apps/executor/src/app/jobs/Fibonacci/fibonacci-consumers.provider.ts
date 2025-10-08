import { Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient } from '@jobber/pulsar';
import { PulsarConsumer } from '@jobber/pulsar';
import fibonacci from 'fibonacci';
import { FibonacciData } from './fibonacci-message-data';
@Injectable()
export class FibonacciConsumersProvider extends PulsarConsumer<FibonacciData> implements OnModuleInit {
    constructor(pulsarClient:PulsarClient){
        super(pulsarClient,"Fibonacci")
    } 

  private count = 0;
  protected async onMessage(data: FibonacciData): Promise<void> { // will be invoked auto by pulsar when new message produced
 
     console.log("onMessage fn invoked:FibonacciConsumersProvider!")
     const fiboFormattedData = fibonacci.iterate(data.iterations)
  
     fiboFormattedData.X = this.count += 1;
     console.log(fiboFormattedData)
  }

    
}
