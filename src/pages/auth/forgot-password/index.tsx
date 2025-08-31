// ** React Imports
import { ReactNode, useState } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// ** Custom Component Import
import CustomTextField from "src/@core/components/mui/text-field";

// ** Third Party Imports
import { Form, Formik } from "formik";
import * as yup from "yup";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";

// ** Configs

// ** Demo Imports
import { LoadingButton } from "@mui/lab";
import Logo from "src/layouts/components/logo";

// ** Locale Imports
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { forgotPassword } from "src/services/auth/auth-service";
import { IApiResponse } from "src/types/requests";
import { parseError } from "src/utils/parse/clean-error";
import AuthContainer from "src/views/pages/auth/auth-container";

// ** Styled Components
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

const defaultValues = {
  email: "",
};

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);

  // ** Hooks
  const { authLoading } = useAuth();

  const { t } = useTranslation();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("forgot-password.validation-messages.email.email").toString())
      .required(
        t("forgot-password.validation-messages.email.required").toString(),
      ),
  });

  const handleSubmit = async (
    values: FormData,
    { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any },
  ) => {
    try {
      const { email } = values;
      await forgotPassword({
        email,
        redirectUrl:
          process.env.NEXT_PUBLIC_BASE_APP_URL + "/auth/" + "reset-password",
      });
      setEmailSent(true);
      toast.success(t("forgot-password.success-message"));
    } catch (error) {
      const backendErrors = parseError(error as IApiResponse);
      if (backendErrors?._error) {
        toast.error(backendErrors._error);
      } else {
        setEmailSent(true);
        toast.success(t("forgot-password.success-message"));
      }
      backendErrors && setErrors(backendErrors);
      console.error("Forgot Password error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthContainer illustrationName={`auth-v2-forgot-password-illustration`}>
      <Logo width="80px" height="80px" />
      <Box sx={{ my: 6 }}>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          {t("forgot-password.title")}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {t("forgot-password.instructions")}
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
                label={t("forgot-password.input-labels.email")}
                name="email"
                placeholder="example@example.com"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mb: 4 }}
              disabled={isSubmitting || authLoading}
              loading={isSubmitting || authLoading}
            >
              {t("forgot-password.submit-button")}
            </LoadingButton>
            {emailSent && (
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", textAlign: "center" }}
              >
                {t("forgot-password.email-sent")}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "text.secondary", mr: 2 }}>
                {t("forgot-password.remember-password")}
              </Typography>
              <Typography href="/login" component={LinkStyled}>
                {t("forgot-password.back-to-login")}
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

ForgotPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);
ForgotPassword.guestGuard = true;
ForgotPassword.authGuard = false;

export default ForgotPassword;
