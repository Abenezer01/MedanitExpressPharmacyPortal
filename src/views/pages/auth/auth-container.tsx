// ** React Imports
import { ReactNode } from "react";

// ** Next Imports

// ** MUI Components
import Box, { BoxProps } from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import { useSettings } from "src/@core/hooks/useSettings";

// ** Locale Imports

// ** Styled Components
const Illustration = styled("img")(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550,
  },
  [theme.breakpoints.down("lg")]: {
    maxHeight: 500,
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: 750,
  },
}));

interface AuthContainerProps {
  children: ReactNode;
  illustrationName: string;
}

const AuthContainer = ({ children, illustrationName }: AuthContainerProps) => {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));
  const { settings } = useSettings();
  const { skin } = settings;
  const imageSource =
    skin === "bordered" ? illustrationName + "bordered" : illustrationName;
  const illustrationSrc = `/images/pages/${imageSource}-${theme.palette.mode}.png`;

  return (
    <Box className="content-right" sx={{ backgroundColor: "background.paper" }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            position: "relative",
            alignItems: "center",
            borderRadius: "20px",
            justifyContent: "center",
            backgroundColor: "customColors.bodyBg",
            margin: (theme) => theme.spacing(8, 0, 8, 8),
          }}
        >
          <Illustration alt="auth-illustration" src={illustrationSrc} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>{children}</Box>
        </Box>
      </RightWrapper>
    </Box>
  );
};

AuthContainer.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);

export default AuthContainer;
