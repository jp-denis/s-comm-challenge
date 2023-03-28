"use client";

import { Form, Field, FormikProps, FieldProps } from "formik";
import { LoanSchema } from "@s-communication/data-schemas";
import { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  TextField,
} from "@mui/material";

const sliderMarks: { value: number; label: string }[] = new Array(4)
  .fill(1)
  .map((_, index) => ({
    value: index === 0 ? 1 : index * 10,
    label: index === 0 ? "1" : (index * 10).toString(),
  }));

const Input = ({ field, form, meta, ...rest }: FieldProps<LoanSchema>) => {
  const { error } = form.getFieldMeta(field.name);
  return <TextField {...field} {...rest} error={!!error} helperText={error} />;
};

export const LoanForm = ({
  submitForm,
  submitCount,
  values,
  isValid,
  isSubmitting,
}: FormikProps<LoanSchema>) => {
  useEffect(() => {
    if (submitCount > 0) {
      const timeout = setTimeout(() => {
        submitForm();
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [values]);

  return (
    <Form>
      <Stack spacing={2} direction={{ xs: "column", md: "row" }} mb="1.5em">
        <Field
          name="amount"
          label="Darlehensbetrag*"
          min="0"
          type="number"
          component={Input}
        />
        <Field
          name="interestRate"
          type="number"
          label="Sollzinssatz (%)*"
          min="0"
          max="100"
          component={Input}
        />
        <Field
          name="amortizationRate"
          type="number"
          label="Anfängliche Tilgung (%)*"
          min="0"
          max="100"
          component={Input}
        />
      </Stack>
      <Divider />
      <Stack direction="column">
        <Stack direction="row" justifyContent="space-between" marginY="1em">
          <Field name="hasFixedInterestPeriod">
            {({ field }: FieldProps) => (
              <FormControlLabel
                control={<Switch {...field} />}
                label="Zinsbindungsdauer"
              />
            )}
          </Field>
          {values.hasFixedInterestPeriod && (
            <Field
              name="fixedInterestPeriodInYears"
              type="number"
              label="Jahre"
              min="1"
              max="30"
              component={Input}
            />
          )}
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isSubmitting}
            sx={{ borderRadius: "2em" }}
          >
            Berechnen
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};
