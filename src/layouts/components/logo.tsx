import { Box } from "@mui/material";

const Logo = ({ ...otherProps }) => {
  return (
    <Box {...otherProps} sx={{ display: "inline-flex" }}>
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  );
};

export default Logo;
