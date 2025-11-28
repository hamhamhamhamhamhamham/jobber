import { BadRequestException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { DiscoveryService,DiscoveredClassWithMeta } from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from './decorators/job.decorator';

import { JobMetadata } from './interfaces/job-metadata.interface';

import { AbstractJob } from './jobs/abstract.job';
import { readFileSync } from 'fs';
import { UPLOADS_PATH } from './uploads/upload';

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

    async executeIntendedJob(jobName:string,data:any){
       const jobObj=  this.jobs.find((item)=>item.meta.name==jobName)    
       if(!jobObj){
        throw new   BadRequestException(`${jobName} job does not exist!:JobsService`);
       }
      if(!(jobObj.discoveredClass.instance instanceof AbstractJob)){
         throw new BadRequestException(`${jobName} job is not an instance of AbstractJob!:JobsService`)
       }
       // if data is file(JSON) -> products
       // if data is not file -> jobs
      
     await jobObj.discoveredClass.instance.execute( data.fileName ? this.getFile(data.fileName) : data
         ,jobObj.meta.name)
       //  await (jobObj.discoveredClass.instance as AbstractJob).execute({},jobObj.meta.name) //make execute available
       return jobObj.meta;
      }

    //if it is a file(JSON)!  
    private getFile(fileName?:string){  
      if(!fileName){
         return
      }
      try{  // convert json file to JSON OBJ!
            return JSON.parse(readFileSync(`${UPLOADS_PATH}/${fileName}`,'utf-8'))
      }catch(err){
         throw new InternalServerErrorException(
            `FAILED to read file:${fileName}`
         )
      }
    }  

}
