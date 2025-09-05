import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService,DiscoveredClassWithMeta } from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from '../decorators/job.decorator';

import { JobMetadata } from '../interfaces/job-metadata.interface';
import { JobsResolver } from './jobs.resolver';
import { AbstractJob } from './abstract.job';

@Injectable()
export class JobsService implements OnModuleInit{
    private jobs :DiscoveredClassWithMeta<JobMetadata>[] = []
    constructor(private readonly discoveryService:DiscoveryService){}
    async onModuleInit() { // runs automatically at first when app runs!!!
      //generates array of objs with meta & related resolver class and functionalities as keys. 
       this.jobs = await this.discoveryService.providersWithMetaAtKey<JobMetadata>(JOB_METADATA_KEY)
       
       console.log("JOBBS ARRAY > ",this.jobs)
    }
    
    async getAllJobs(){
       const jobsMeta = this.jobs.map(item=> item.meta)
    
    //    console.log(jobsMeta)
       return jobsMeta
    }

    async executeIntendedJob(jobName:string){

       const jobObj=  this.jobs.find((item)=>item.meta.name==jobName)    
        

       if(!jobObj){
        throw new   BadRequestException(`job ${jobName} does not exits!`);
       }
       await (jobObj.discoveredClass.instance as AbstractJob).execute()

       return jobObj.meta;

    }


}
