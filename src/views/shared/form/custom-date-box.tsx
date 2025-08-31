import { FormHelperText, InputAdornment } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";
import Icon from "src/@core/components/icon";
import CustomTextField from "src/@core/components/mui/text-field";

const CustomDateSelector: React.FC<any> = (props) => {
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();

  return (
    <>
      <CustomTextField
        type="date"
        fullWidth
        {...field}
        {...props}
        endAdornment={
          <InputAdornment position="end">
            <Icon fontSize="1.25rem" icon={"tabler:calendar"} />
          </InputAdornment>
        }
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

export default CustomDateSelector;
