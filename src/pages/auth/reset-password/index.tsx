import React, { ReactNode, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import CustomTextField from "src/@core/components/mui/text-field";
import AuthContainer from "src/views/pages/auth/auth-container";
import BlankLayout from "src/@core/layouts/BlankLayout";
import Logo from "src/layouts/components/logo";
import Link from "next/link";
import { parseError } from "src/utils/parse/clean-error";
import { IApiResponse } from "src/types/requests";
import { useRouter } from "next/router";
import { useAuth } from "src/hooks/useAuth";
import { resetPassword } from "src/services/auth/auth-service";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

const defaultValues = {
  password: "",
  passwordConfirm: "",
};

interface FormData {
  password: string;
  passwordConfirm: string;
}

const ResetPassword = () => {
  const [passwordReset, setPasswordReset] = useState<boolean>(false);
  const { authLoading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (!token) {
      // Redirect to login if there's no token in the URL
      router.push("/auth/login");
    }
  }, [token, router]);

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, t("reset-password.validation-messages.password.min").toString())
      .required(
        t("reset-password.validation-messages.password.required").toString(),
      ),
    passwordConfirm: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        t(
          "reset-password.validation-messages.passwordConfirm.match",
        ).toString(),
      )
      .required(
        t(
          "reset-password.validation-messages.passwordConfirm.required",
        ).toString(),
      ),
  });

  const handleSubmit = async (
    values: FormData,
    { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any },
  ) => {
    try {
      if (!token) {
        toast.error(t("reset-password.error.no-token"));
        setSubmitting(false);

        return;
      }

      const { password } = values;
      await resetPassword({ password, token: token.toString() });
      setPasswordReset(true);
      toast.success(t("reset-password.success-message"));
      router.push("/auth/login");
    } catch (error) {
      const backendErrors = parseError(error as IApiResponse);
      if (backendErrors?.message) {
        toast.error(backendErrors.message);
      } else {
      }
      backendErrors && setErrors(backendErrors);
      console.error("Reset Password error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthContainer illustrationName={`auth-v2-reset-password-illustration`}>
      <Logo width="80px" height="80px" />
      <Box sx={{ my: 6 }}>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          {t("reset-password.title")}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {t("reset-password.instructions")}
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
                label={t("reset-password.input-labels.password")}
                name="password"
                type="password"
                placeholder="••••••••"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <CustomTextField
                fullWidth
                label={t("reset-password.input-labels.passwordConfirm")}
                name="passwordConfirm"
                type="password"
                placeholder="••••••••"
                error={Boolean(
                  touched.passwordConfirm && errors.passwordConfirm,
                )}
                helperText={touched.passwordConfirm && errors.passwordConfirm}
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
              {t("reset-password.submit-button")}
            </LoadingButton>
            {passwordReset && (
              <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
                {t("reset-password.password-reset")}
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
                {t("reset-password.remember-password")}
              </Typography>
              <Typography href="/auth/login" component={LinkStyled}>
                {t("reset-password.back-to-login")}
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

ResetPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);
ResetPassword.guestGuard = true;

export default ResetPassword;
