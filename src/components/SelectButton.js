import React from "react";
import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: "1px solid gold",
        borderRadius: 1,
        p: 1.25,
        px: 2.5,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "gold",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
        m: 0.5,
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default SelectButton;