
import { AbstractJob } from './abstract.job';
import { Job } from '../decorators/job.decorator';



// bind each provider to a metadata object 
// 👉class -> obj{}
@Job({name:"Fibonacci",description:"generate fibo sequence!"}) //has @Injectable inbuilt
export class FibonacciJobProvider extends AbstractJob{




}
