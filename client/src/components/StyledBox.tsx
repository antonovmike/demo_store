import { Box } from "@mui/material";
import React from "react";

type FormBoxProps = React.ComponentPropsWithoutRef<"form"> & { sx?: object };

export const FormBox: React.FC<FormBoxProps> = ({
  onSubmit,
  children,
  ...props
}) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
