
import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';

import { JobModel } from './models/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobDto } from './dtos/execute-job.dto';

@Resolver()
export class JobsResolver {
    constructor(private readonly jobsService:JobsService){}

    @Query(()=>[JobModel],{name:'jobs'})
    async getchAlljobs(){
      return await this.jobsService.getAllJobs()
    }
    
    //find(name) and execute functionalities related to job resolver!!
    @Mutation(()=>JobModel)
    async executeJob(@Args('executeJobDto') executeJobDto:ExecuteJobDto){
        return await this.jobsService.executeIntendedJob(executeJobDto.name)
    }

}
