import { Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient } from '@pulsar-lib';
import { PulsarConsumer } from '@pulsar-lib';
import fibonacci from 'fibonacci';
import { FibonacciData } from './fibonacci-message-data';
@Injectable()
export class FibonacciConsumersProvider extends PulsarConsumer<FibonacciData> implements OnModuleInit {
    constructor(pulsarClient:PulsarClient){
        super(pulsarClient,"Fibonacci")
    } 


  protected async onMessage(data: FibonacciData): Promise<void> { // will be invoked auto by pulsar when new message produced
 
     console.log("onMessage fn invoked:FibonacciConsumersProvider!")
     const fiboFormattedData = fibonacci.iterate(data.iterations)
     console.log(data)
     console.log(data.iterations)
     console.log(fiboFormattedData)
  }

    
}
