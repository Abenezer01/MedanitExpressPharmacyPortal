import { FormHelperText } from "@mui/material";
import { useField } from "formik";
import React from "react";
import "react-international-phone/style.css";
import { MuiPhone } from "src/views/components/phone/custome-phone";

const CustomPhoneInput: React.FC<any> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (phone: string) => {
    helpers.setValue(phone);
  };

  return (
    <>
      <MuiPhone label={label} value={field.value} onChange={handleChange} />
      {meta.touched && meta.error && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </>
  );
};

export default CustomPhoneInput;
