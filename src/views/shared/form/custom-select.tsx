import React from "react";
import { useField, useFormikContext } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";

const CustomSelect: React.FC<any> = (props) => {
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();
  const hasError = !!(meta.touched && meta.error);

  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
      <Select
        id={props.name} // Add this line
        name={props.name} // Add this line
        labelId={`${props.name}-label`}
        label={props.label}
        value={field.value || ""} // Ensure a default value if field.value is undefined
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled={props.disabled || isSubmitting}
      >
        {props.options.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
