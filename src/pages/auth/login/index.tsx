// ** React Imports
import { ReactNode, useState } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

// ** Custom Component Import
import CustomTextField from "src/@core/components/mui/text-field";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Imports
import * as yup from "yup";
import { Formik, Form } from "formik";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Demo Imports
import { LoadingButton } from "@mui/lab";
import Logo from "src/layouts/components/logo";

// ** Locale Imports
import { parseError } from "src/utils/parse/clean-error";
import { IApiResponse } from "src/types/requests";
import toast from "react-hot-toast";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useTranslation } from "react-i18next";
import AuthContainer from "src/views/pages/auth/auth-container";

// ** Styled Components
const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    color: theme.palette.text.secondary,
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

const defaultValues = {
  password: "",
  email: "",
};

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ** Hooks
  const { authLoading, login } = useAuth();
  const { t } = useTranslation();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("login.validation-messages.email.email").toString())
      .required(t("login.validation-messages.email.required").toString()),
    password: yup
      .string()
      .min(
        5,
        t("login.validation-messages.password.min", { min: 5 }).toString(),
      )
      .required(t("login.validation-messages.password.required").toString()),
  });

  const handleSubmit = async (
    values: FormData,
    { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any },
  ) => {
    try {
      const { email, password } = values;
      login({ email, password, rememberMe }, (error: IApiResponse) => {
        const backendErrors = parseError(error);
        console.log("backendErrors", error);
        if (backendErrors?._error) {
          toast.error(backendErrors._error);
        }
        backendErrors && setErrors(backendErrors);
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthContainer illustrationName={`auth-v2-login-illustration`}>
      <Logo width="80px" height="80px" />
      <Box sx={{ my: 6 }}>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          {t("login.welcome-message", {
            templateName: themeConfig.templateName,
          })}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {t("login.sign-in-message")}
        </Typography>
      </Box>

      <Formik
        initialValues={defaultValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form noValidate autoComplete="off">
            <Box sx={{ mb: 4 }}>
              <CustomTextField
                fullWidth
                autoFocus
                label={t("login.input-labels.email")}
                name="email"
                placeholder="admin@vuexy.com"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box sx={{ mb: 1.5 }}>
              <CustomTextField
                fullWidth
                label={t("login.input-labels.password")}
                name="password"
                id="auth-login-v2-password"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          fontSize="1.25rem"
                          icon={showPassword ? "tabler:eye" : "tabler:eye-off"}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                mb: 1.75,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                label={t("login.remember-me")}
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
              />
              <Typography component={LinkStyled} href="/auth/forgot-password">
                {t("login.forgot-password")}
              </Typography>
            </Box>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mb: 4 }}
              disabled={isSubmitting || authLoading}
              loading={isSubmitting || authLoading}
            >
              Login
            </LoadingButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "text.secondary", mr: 2 }}>
                {t("login.new-on-platform")}
              </Typography>
              <Typography href="/register" component={LinkStyled}>
                {t("login.create-account")}
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;
Login.guestGuard = true;

export default Login;
