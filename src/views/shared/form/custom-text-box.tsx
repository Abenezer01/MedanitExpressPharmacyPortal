import { FormHelperText, IconButton, InputAdornment } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React, { useState } from "react";
import Icon from "src/@core/components/icon";
import CustomTextField from "src/@core/components/mui/text-field";

const CustomTextBox: React.FC<any> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();

  return (
    <>
      <CustomTextField
        fullWidth
        {...field}
        {...props}
        InputProps={{
          ...(props.InputProps || {}),
          endAdornment:
            props.type === "password" && props?.showHidePassword ? (
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
            ) : props.endAdornment || null
        }}
        disabled={props?.disabled || isSubmitting}
      />
      {meta.touched && meta.error && (
        <FormHelperText error id="standard-weight-helper-text-user-title">
          {meta.error}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomTextBox;
