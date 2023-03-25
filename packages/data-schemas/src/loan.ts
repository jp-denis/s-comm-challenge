import { z } from "zod";

export const loanSchema = z.object({
  amount: z.number().positive(),
  interestRate: z.number().nonnegative(),
  amortizationRate: z.number().nonnegative(),
  hasFixedInterestPeriod: z.boolean(),
  fixedInterestPeriodInYears: z.number().min(1).max(30).nullable(),
});

export type LoanSchema = z.infer<typeof loanSchema>;
