import { applyDecorators, Injectable, SetMetadata } from "@nestjs/common";
import { JobMetadata } from "../interfaces/job-metadata.interface";


// custom decorator ready for a class -> FibonacciJobProvider
// applies multi decoratorOrfunctionlaities'

export const JOB_METADATA_KEY = 'job_meta'
export const Job =(meta:JobMetadata)=> applyDecorators(SetMetadata(JOB_METADATA_KEY,meta),Injectable())