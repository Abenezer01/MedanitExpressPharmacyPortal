// ** MUI Imports
import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "src/layouts/components/logo";

const FallbackSpinner = ({ sx }: { sx?: BoxProps["sx"] }) => {
  // ** Hook

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Logo width="80px" height="80px" />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  );
};

export default FallbackSpinner;
