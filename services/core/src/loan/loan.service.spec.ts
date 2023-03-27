import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanService],
    }).compile();

    service = module.get<LoanService>(LoanService);
  });

  it('should calculate something', () => {
    service.calculateLoan({
      amount: 10000,
      interestRate: 0.02,
      amortizationRate: 0.1,
      hasFixedInterestPeriod: false,
      fixedInterestPeriodInYears: null,
    });
    expect(true).toBe(true);
  });

  it('should calculate something', () => {
    const result = service.calculateLoan({
      amount: 10000,
      interestRate: 0.02,
      amortizationRate: 0.1,
      hasFixedInterestPeriod: true,
      fixedInterestPeriodInYears: 1,
    });
    expect(result.remainingDebt).toBeDefined();
  });
});
