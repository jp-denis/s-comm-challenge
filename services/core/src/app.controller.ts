import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { loanSchema } from '@s-communications/data-schemas';
import { LoanCalculationResult } from '@s-communications/types';
import { LoanDTO } from './loan/loan.dto';
import { LoanService } from './loan/loan.service';

@Controller()
export class AppController {
  constructor(private readonly loanService: LoanService) {}

  @Post('/calculate-loan')
  calculateLoan(@Body() loan: LoanDTO): LoanCalculationResult {
    const result = loanSchema.safeParse(loan);

    if (!result.success) {
      throw new BadRequestException();
    }

    const { interestRate, amortizationRate } = result.data;

    return this.loanService.calculateLoan({
      ...result.data,
      interestRate: interestRate / 100,
      amortizationRate: amortizationRate / 100,
    });
  }
}
