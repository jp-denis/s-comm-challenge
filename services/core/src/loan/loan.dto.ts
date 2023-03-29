import { LoanSchema } from '@s-communication/data-schemas';

export class LoanDTO implements LoanSchema {
  amount: number;
  interestRate: number;
  amortizationRate: number;
  hasFixedInterestPeriod: boolean;
  fixedInterestPeriodInYears: number | null;
}
