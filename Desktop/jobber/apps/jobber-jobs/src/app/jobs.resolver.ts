
import { Resolver,Query, Args, Mutation } from '@nestjs/graphql';

import { JobModel } from './models/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobDto } from './dtos/execute-job.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from "@jobber/nestjs"


@Resolver()
export class JobsResolver {
    constructor(private readonly jobsService:JobsService){}

    @UseGuards(GqlAuthGuard) // grpc authentication
    @Query(()=>[JobModel],{name:'jobs'})
    async getchAlljobs(){
      return await this.jobsService.getAllJobs()
    }
    
    //find(name) and execute functionalities related to job resolver!!
    @Mutation(()=>JobModel)
    @UseGuards(GqlAuthGuard) // grpc authentication
    async executeJob(@Args('executeJobDto') executeJobDto:ExecuteJobDto){
      return await this.jobsService.executeIntendedJob(executeJobDto.name,executeJobDto.data)
    }

}
