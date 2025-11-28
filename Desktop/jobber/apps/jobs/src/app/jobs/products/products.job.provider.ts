

import { AbstractJob } from '../abstract.job';
import { Job } from '../../decorators/job.decorator';
import {  ProductMessage, PulsarClient } from '@jobber/pulsar';
import { Jobs } from '@jobber/nestjs';


// bind each provider to a metadata object 
// 👉class -> obj{}
@Job({name:Jobs.PRODUCTS,description:"Loads uploaded product data into  the DB after enrichment!!"}) //has @Injectable inbuilt
export class ProductsJobProvider extends AbstractJob<ProductMessage>{
    protected classConstructorForValidation = ProductMessage; //❗ data nested obj validation
    constructor(pulsarClient:PulsarClient){
        super(pulsarClient)   // initialize parent constructor
    }
}
