import { Test, TestingModule } from '@nestjs/testing';
import { FibonacciJobProvider } from './fibonacci.job.provider';

describe('FibonacciJobProvider', () => {
  let provider: FibonacciJobProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FibonacciJobProvider],
    }).compile();

    provider = module.get<FibonacciJobProvider>(FibonacciJobProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
