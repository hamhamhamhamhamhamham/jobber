import { Module } from '@nestjs/common';

import { FibonacciConsumersProvider } from './Fibonacci/fibonacci-consumers.provider';
import { PulsarModule } from '@jobber/pulsar';



//✍️ در پوشه فیبوناچی برود بهتر است!
@Module({
  imports: [PulsarModule], // Use in Constructor:DI & // it's constructor auto invoked: connection to PULSAR
  providers: [FibonacciConsumersProvider],
})
export class JobsModule {}
