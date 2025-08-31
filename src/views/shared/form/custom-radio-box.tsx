import {
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";

const CustomRadioBox: React.FC<any> = ({
  name,
  label,
  options,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();
  const hasError = !!(meta.touched && meta.error);

  return (
    <FormControl component="fieldset" fullWidth>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup
        name={name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        {...otherProps}
      >
        {options.map((option: any) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={otherProps?.disabled || isSubmitting}
          />
        ))}
      </RadioGroup>
      {hasError && (
        <FormHelperText error id={`radio-group-helper-text-${name}`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomRadioBox;
