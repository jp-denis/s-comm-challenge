export type PeriodReport = {
  period: number;
  installment: number;
  interestPayment: number;
  loanPayment: number;
  debt: number;
};

export type LoanCalculationResult = {
  monthlyInstallment: number;
  remainingDebt?: number;
  yearlyReport: (PeriodReport & { monthlyReport: PeriodReport[] })[];
};
