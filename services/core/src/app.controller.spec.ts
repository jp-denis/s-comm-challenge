import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { LoanService } from './loan/loan.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [LoanService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  describe('POST /calculate-loan', () => {
    test('proper input', () => {
      const result = appController.calculateLoan({
        amortizationRate: 0.1,
        amount: 10000,
        hasFixedInterestPeriod: true,
        fixedInterestPeriodInYears: 1,
        interestRate: 0.02,
      });
      console.log(result);
      expect(result).toBeDefined();
    });

    test('wrong input', () => {
      console.log(appController.calculateLoan);
      expect(() => {
        appController.calculateLoan({
          // @ts-ignore
          amortizationRate: 'wrong input!',
          amount: 10000,
          hasFixedInterestPeriod: true,
          fixedInterestPeriodInYears: 1,
          interestRate: 0.02,
        });
      }).toThrowError(BadRequestException);
    });
  });
});
