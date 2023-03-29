import { Injectable } from '@nestjs/common';
import { LoanCalculationResult, PeriodReport } from '@s-communications/types';
import { LoanDTO } from './loan.dto';

@Injectable()
export class LoanService {
  calculateLoan(input: LoanDTO): LoanCalculationResult {
    const {
      amortizationRate,
      interestRate,
      amount,
      hasFixedInterestPeriod,
      fixedInterestPeriodInYears,
    } = input;

    const installment = amount * (amortizationRate + interestRate);

    const initialMonthlyInstallment = installment / 12;
    let monthlyInstallment = initialMonthlyInstallment;
    let debt = amount;
    let year = 1;

    const yearlyReport: LoanCalculationResult['yearlyReport'] = [];

    while (debt > 0) {
      let yearlyInstallment = 0;
      let yearlyLoanPayment = 0;
      let yearlyInterestPayment = 0;
      const monthlyReport: PeriodReport[] = [];

      if (
        hasFixedInterestPeriod &&
        fixedInterestPeriodInYears &&
        year > fixedInterestPeriodInYears
      ) {
        break;
      }
      for (let i = 0; i < 12 && debt > 0; i++) {
        // if last payment
        if (debt < monthlyInstallment) {
          monthlyInstallment = debt + (debt * interestRate) / 12;
        }

        yearlyInstallment += monthlyInstallment;

        const interestPayment = (debt * interestRate) / 12;
        yearlyInterestPayment += interestPayment;

        const loanPayment = monthlyInstallment - interestPayment;
        yearlyLoanPayment += loanPayment;

        debt -= loanPayment;

        monthlyReport.push({
          installment: monthlyInstallment,
          interestPayment,
          loanPayment,
          debt,
          period: i + 1,
        });
      }

      yearlyReport.push({
        installment: yearlyInstallment,
        interestPayment: yearlyInterestPayment,
        loanPayment: yearlyLoanPayment,
        debt,
        period: year,
        monthlyReport,
      });

      year++;
    }

    return {
      monthlyInstallment: initialMonthlyInstallment,
      remainingDebt: yearlyReport.at(-1)?.monthlyReport.at(-1)?.debt,
      yearlyReport,
    };
  }
}
