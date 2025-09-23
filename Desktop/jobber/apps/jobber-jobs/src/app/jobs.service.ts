import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService,DiscoveredClassWithMeta } from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from './decorators/job.decorator';

import { JobMetadata } from './interfaces/job-metadata.interface';

import { AbstractJob } from './jobs/abstract.job';

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
       return jobsMeta
    }

    async executeIntendedJob(jobName:string,data:object){
       const jobObj=  this.jobs.find((item)=>item.meta.name==jobName)    
       if(!jobObj){
        throw new   BadRequestException(`${jobName} job does not exist!:JobsService`);
       }
      if(!(jobObj.discoveredClass.instance instanceof AbstractJob)){
         throw new BadRequestException(`${jobName} job is not an instance of AbstractJob!:JobsService`)
       }
       await jobObj.discoveredClass.instance.execute(data,jobObj.meta.name)
       //  await (jobObj.discoveredClass.instance as AbstractJob).execute({},jobObj.meta.name) //make execute available
       return jobObj.meta;
      }


}
