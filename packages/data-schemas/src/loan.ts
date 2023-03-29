import { z } from "zod";

// TODO: translate default error messages to German
export const loanSchema = z.object({
  amount: z.number().gt(0),
  interestRate: z.number().gt(0),
  amortizationRate: z.number().gt(0),
  hasFixedInterestPeriod: z.boolean(),
  fixedInterestPeriodInYears: z.number().min(1).max(30).nullable(),
});

export type LoanSchema = z.infer<typeof loanSchema>;
