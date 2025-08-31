import React from "react";
import { FormikProps, Field } from "formik";
import { useTranslation } from "react-i18next";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import Address from "src/types/member/address";

interface AddressFormProps {
  formik: FormikProps<Address>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Address;
}

const AddressForm: React.FC<AddressFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();
  console.log("address errors", formik.errors);

  return (
    <>
      <Field
        as={CustomTextBox}
        fullWidth
        label={transl("Country")}
        placeholder={transl("Country")}
        name="country"
        size="small"
        sx={{ mb: 2 }}
      />
      <Field
        as={CustomTextBox}
        fullWidth
        label={transl("City")}
        placeholder={transl("City")}
        name="city"
        size="small"
        sx={{ mb: 2 }}
      />
      <Field
        as={CustomTextBox}
        fullWidth
        label={transl("Sub City")}
        placeholder={transl("Sub City")}
        name="sub_city"
        size="small"
        sx={{ mb: 2 }}
      />
      <Field
        as={CustomTextBox}
        fullWidth
        label={transl("Suburb")}
        placeholder={transl("Suburb")}
        name="suburb"
        size="small"
        sx={{ mb: 2 }}
      />
      <Field
        as={CustomTextBox}
        fullWidth
        label={transl("District")}
        placeholder={transl("District")}
        name="district"
        size="small"
        sx={{ mb: 2 }}
      />
      <Field
        as={CustomTextBox}
        fullWidth
        label={transl("House Number")}
        placeholder={transl("House Number")}
        name="house_number"
        size="small"
        sx={{ mb: 2 }}
      />
      <Field
        as={CustomTextBox}
        fullWidth
        label={transl("Postal Address")}
        placeholder={transl("Postal Address")}
        name="postal_address"
        size="small"
        sx={{ mb: 2 }}
      />
      {/* You may want to handle lat and lng differently, depending on your use case */}
      <Field
        as={CustomTextBox}
        fullWidth
        label={transl("Latitude")}
        placeholder={transl("Latitude")}
        name="lat"
        size="small"
        sx={{ mb: 2 }}
      />
      <Field
        as={CustomTextBox}
        fullWidth
        label={transl("Longitude")}
        placeholder={transl("Longitude")}
        name="lng"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default AddressForm;
