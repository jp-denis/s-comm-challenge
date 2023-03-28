import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LoanCalculationResult, PeriodReport } from "@s-communication/types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { currencyFormatter } from "@/src/helpers/currencyFormatter";

type Props = {
  data: LoanCalculationResult["yearlyReport"];
};

type Headers = keyof PeriodReport;

const TABLE_HEADERS = [
  "installment",
  "interestPayment",
  "loanPayment",
  "debt",
] as const satisfies Readonly<Headers[]>;

const TABLE_LABELS: Record<Exclude<Headers, "period">, string> = {
  installment: "Ratenhöhe",
  loanPayment: "Tilgungsanteil",
  interestPayment: "Zinsanteil",
  debt: "Restschuld",
} as const;

const Row = (row: Props["data"][number]) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.period}</TableCell>
        {TABLE_HEADERS.map((property) => (
          <TableCell key={property}>
            {currencyFormatter.format(row[property])}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={TABLE_HEADERS.length + 2}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">Monat</Typography>
                    </TableCell>
                    {TABLE_HEADERS.map((header) => (
                      <TableCell key={header}>
                        <Typography fontWeight="bold">
                          {TABLE_LABELS[header]}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.monthlyReport.map((subRow) => (
                    <TableRow key={subRow.period}>
                      <TableCell>{subRow.period}</TableCell>
                      {TABLE_HEADERS.map((property) => (
                        <TableCell key={property}>
                          {currencyFormatter.format(subRow[property])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const LoanTable = ({ data }: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography fontWeight="bold">Jahr</Typography>
            </TableCell>
            {TABLE_HEADERS.map((header) => (
              <TableCell key={header}>
                <Typography fontWeight="bold">
                  {TABLE_LABELS[header]}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.period} {...row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
