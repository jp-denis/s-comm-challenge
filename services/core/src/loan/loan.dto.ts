import { LoanSchema } from '@s-communications/data-schemas';

export class LoanDTO implements LoanSchema {
  amount: number;
  interestRate: number;
  amortizationRate: number;
  hasFixedInterestPeriod: boolean;
  fixedInterestPeriodInYears: number | null;
}
