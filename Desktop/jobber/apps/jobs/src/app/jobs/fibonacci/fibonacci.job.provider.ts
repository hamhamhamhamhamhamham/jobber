
import { AbstractJob } from '../abstract.job';
import { Job } from '../../decorators/job.decorator';
import { FibonacciMessage, PulsarClient } from '@jobber/pulsar';
import { Jobs } from '@jobber/nestjs';




// bind each provider to a metadata object 
// 👉class -> obj{}
@Job({name:Jobs.FIBONACCI,description:"generate fibo sequence!"}) //has @Injectable inbuilt
export class FibonacciJobProvider extends AbstractJob<FibonacciMessage>{
    protected classConstructorForValidation = FibonacciMessage; //❗ data nested obj validation
    constructor(pulsarClient:PulsarClient){
        super(pulsarClient)   // initialize parent constructor
    }
}
