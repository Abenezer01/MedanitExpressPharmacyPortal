// ** React Imports
import { ChangeEvent, useState } from "react";

// ** Next Import

// ** MUI Imports
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Custom Component Import
import CustomTextField from "src/@core/components/mui/text-field";

interface State {
  newPassword: string;
  showNewPassword: boolean;
  confirmNewPassword: string;
  showConfirmNewPassword: boolean;
}

const UserViewSecurity = () => {
  // ** States

  const [values, setValues] = useState<State>({
    newPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showConfirmNewPassword: false,
  });

  // Handle Password
  const handleNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  // Handle Confirm Password
  const handleConfirmNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Change Password" />
          <CardContent>
            <Alert icon={false} severity="warning" sx={{ mb: 4 }}>
              <AlertTitle
                sx={{
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  mb: (theme) => `${theme.spacing(2.5)} !important`,
                }}
              >
                Ensure that these requirements are met
              </AlertTitle>
              Minimum 8 characters long, uppercase & symbol
            </Alert>

            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label="New Password"
                    placeholder="············"
                    value={values.newPassword}
                    id="user-view-security-new-password"
                    onChange={handleNewPasswordChange("newPassword")}
                    type={values.showNewPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label="toggle password visibility"
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={
                                values.showNewPassword
                                  ? "tabler:eye"
                                  : "tabler:eye-off"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    placeholder="············"
                    label="Confirm New Password"
                    value={values.confirmNewPassword}
                    id="user-view-security-confirm-new-password"
                    type={values.showConfirmNewPassword ? "text" : "password"}
                    onChange={handleConfirmNewPasswordChange(
                      "confirmNewPassword",
                    )}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmNewPassword}
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={
                                values.showConfirmNewPassword
                                  ? "tabler:eye"
                                  : "tabler:eye-off"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserViewSecurity;
