import { Test, TestingModule } from '@nestjs/testing';
import { FibonacciConsumersProvider } from './fibonacci-consumers.provider';

describe('JobsConsumersProvider', () => {
  let provider: FibonacciConsumersProvider ;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FibonacciConsumersProvider ],
    }).compile();

    provider = module.get<FibonacciConsumersProvider >(FibonacciConsumersProvider );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
