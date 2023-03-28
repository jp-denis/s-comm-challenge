"use client";

import { useState } from "react";
import { LoanCalculationResult } from "@s-communication/types";
import { LoanForm } from "./LoanForm";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { loanSchema, LoanSchema } from "@s-communication/data-schemas";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { LoanTable } from "./LoanTable";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { LoanSummary } from "./LoanSummary";

const INITIAL_VALUES: LoanSchema = {
  amount: 250000,
  interestRate: 2,
  amortizationRate: 3,
  hasFixedInterestPeriod: false,
  fixedInterestPeriodInYears: 10,
};

export default function Home() {
  const [result, setResult] = useState<LoanCalculationResult>();

  const submitHandler = async (
    values: LoanSchema,
    helpers: FormikHelpers<LoanSchema>
  ) => {
    helpers.setStatus(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/calculate-loan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = (await response.json()) as LoanCalculationResult;

      setResult(data);
    } catch (e) {
      // this has been oversimplified for challenge purposes
      helpers.setStatus({
        error: new Error(
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut"
        ),
      });
    }
  };

  return (
    <main>
      <Container maxWidth="md">
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={submitHandler}
          validationSchema={toFormikValidationSchema(loanSchema)}
        >
          {(props: FormikProps<LoanSchema>) => {
            const { status, setStatus, values, isSubmitting } = props;
            return (
              <>
                {props.status?.error && (
                  <Alert severity="error" onClose={() => setStatus(null)}>
                    <AlertTitle>Error</AlertTitle>
                    {status.error.message}
                  </Alert>
                )}

                <Box maxWidth="600px" mx="auto" mb="2em">
                  <Paper>
                    <Box p="1.5em">
                      <LoanForm {...props} />
                    </Box>
                  </Paper>
                </Box>

                {isSubmitting && <CircularProgress />}
                {!isSubmitting && result && (
                  <Stack direction="column" alignItems="stretch">
                    <Box width="100%" maxWidth="600px" mx="auto" mb="2em">
                      <Paper elevation={1}>
                        <LoanSummary
                          {...result}
                          hasFixedInterestPeriod={values.hasFixedInterestPeriod}
                        />
                      </Paper>
                    </Box>
                    <Paper>
                      <Box paddingX="1.5em">
                        <LoanTable data={result.yearlyReport} />
                      </Box>
                    </Paper>
                  </Stack>
                )}
              </>
            );
          }}
        </Formik>
      </Container>
    </main>
  );
}
