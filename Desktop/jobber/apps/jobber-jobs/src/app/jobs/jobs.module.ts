import { Module } from '@nestjs/common';

import { FibonacciJobProvider } from './fibonacci.job.provider';
import { JobsService } from './jobs.service';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsResolver } from './jobs.resolver';

@Module({
  imports: [DiscoveryModule],
  providers: [FibonacciJobProvider, JobsService, JobsResolver],
})
export class JobsModule {}
