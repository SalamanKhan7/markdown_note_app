import * as React from "react";
import Alert from "@mui/material/Alert";

import { useEffect } from "react";

import { Snackbar } from "@mui/material";

export default function StatusAlert({ open, setOpen, message, severity }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [open, setOpen]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
