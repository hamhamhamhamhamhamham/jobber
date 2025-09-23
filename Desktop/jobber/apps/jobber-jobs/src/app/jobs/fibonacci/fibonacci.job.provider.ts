
import { AbstractJob } from '../abstract.job';
import { Job } from '../../decorators/job.decorator';
import { PulsarClient } from '@pulsar-lib';
import { FibonacciData } from './fibonacci.jobs';



// bind each provider to a metadata object 
// 👉class -> obj{}
@Job({name:"Fibonacci",description:"generate fibo sequence!"}) //has @Injectable inbuilt
export class FibonacciJobProvider extends AbstractJob<FibonacciData>{
    protected classConstructorForValidation = FibonacciData; //❗ data nested obj validation
    constructor(pulsarClient:PulsarClient){
        super(pulsarClient)   // initialize parent constructor
    }
}
