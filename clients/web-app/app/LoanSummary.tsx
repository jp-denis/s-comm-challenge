import { currencyFormatter } from "@/src/helpers/currencyFormatter";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { LoanCalculationResult } from "@s-communication/types";

type Props = Pick<
  LoanCalculationResult,
  "monthlyInstallment" | "remainingDebt"
> & { hasFixedInterestPeriod: boolean };

export const LoanSummary = ({
  monthlyInstallment,
  remainingDebt,
  hasFixedInterestPeriod,
}: Props) => {
  return (
    <Box p="1.5em">
      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight="bold">Monatliche Rate</Typography>
        <Typography>{currencyFormatter.format(monthlyInstallment)}</Typography>
      </Stack>
      {hasFixedInterestPeriod && typeof remainingDebt === "number" && (
        <Box marginTop="1em">
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            paddingTop="1em"
          >
            <Typography fontWeight="bold">Restschuld</Typography>
            <Typography>{currencyFormatter.format(remainingDebt)}</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};
