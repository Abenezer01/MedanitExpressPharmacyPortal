import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { useField } from "formik";
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomCheckboxGroupProps {
  name: string;
  label?: string;
  options: Option[];
  sx?: any;
}

const CustomCheckboxGroup: React.FC<CustomCheckboxGroupProps> = ({
  name,
  label,
  options,
  sx,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (optionValue: string) => {
    const set = new Set(field.value || []);
    if (set.has(optionValue)) {
      set.delete(optionValue);
    } else {
      set.add(optionValue);
    }
    helpers.setValue(Array.from(set));
  };

  return (
    <Box sx={sx}>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup row>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={Array.isArray(field.value) && field.value.includes(option.value)}
                onChange={() => handleChange(option.value)}
                name={name}
                {...props}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {meta.touched && meta.error ? (
        <FormHelperText error>{meta.error}</FormHelperText>
      ) : null}
    </Box>
  );
};

export default CustomCheckboxGroup;