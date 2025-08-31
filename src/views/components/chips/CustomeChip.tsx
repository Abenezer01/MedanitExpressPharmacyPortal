import React from "react";
import Chip, { ChipProps } from "@mui/material/Chip";

interface CustomChipProps extends ChipProps {
  rounded?: boolean;
  skin?: "light" | "default";
}

const CustomChip: React.FC<CustomChipProps> = ({
  rounded,
  skin,
  ...props
}) => {
  return (
    <Chip
      {...props}
      variant={skin === "light" ? "outlined" : "filled"}
      sx={{
        borderRadius: rounded ? "16px" : undefined,
        fontWeight: 600,
        ...props.sx,
      }}
    />
  );
};

export default CustomChip;