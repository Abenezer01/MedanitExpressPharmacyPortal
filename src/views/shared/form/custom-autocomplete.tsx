import React from "react";
import { FormHelperText, InputLabel } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";

const CustomAutocomplete: React.FC<any> = ({
  label,
  placeholder,
  options = [],
  labelField = "label", // default labelField value
  disabled = false, // default disabled value
  ...props
}) => {
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();

  const renderInput = React.useMemo(
    () => (params: any) => (
      <TextField {...params} label={label} placeholder={placeholder} />
    ),
    [label, placeholder],
  );

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Autocomplete
        fullWidth
        {...field}
        {...props}
        options={Array.isArray(options) ? options : []}
        getOptionLabel={(option: any) => option[labelField] || ""}
        disabled={disabled || isSubmitting}
        renderInput={renderInput}
      />
      {meta.touched && meta.error && (
        <FormHelperText error id={`standard-weight-helper-text-${props.name}`}>
          {meta.error}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomAutocomplete;
