"use client";

import { Box, Stack, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Image from "next/image";
import SLogo from "./S-logo.svg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "2rem",
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <header>
        <title>Tilgungsplaner</title>
      </header>
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <Stack
            minHeight="100vh"
            direction={{ sm: "column", md: "row" }}
            alignItems="stretch"
          >
            <Box
              bgcolor="#f0f0f0"
              height={{ xs: "100px", md: "auto" }}
              width={{ md: "300px" }}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                marginTop={{ xs: "-1em", md: "auto" }}
              >
                <Image src={SLogo} width="130" height="130" alt="Logo" />
                <Typography
                  variant="h1"
                  fontSize="24px"
                  fontWeight="normal"
                  marginLeft="-1.8em"
                  marginTop="0.3em"
                  color="primary"
                >
                  Tilgungsplaner
                </Typography>
              </Stack>
            </Box>
            <Box flexGrow="1" paddingY="2em">
              {children}
            </Box>
          </Stack>
        </ThemeProvider>
      </body>
    </html>
  );
}
