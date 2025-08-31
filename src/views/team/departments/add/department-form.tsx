import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface DepartmentFormProps {
  formik: FormikProps<any>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: any;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({}) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl("name")}
        placeholder={transl("name")}
        name="name"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl("description")}
        placeholder={transl("description")}
        name="description"
        multiline
        rows={3}
        size="small"
      />
    </>
  );
};

export default DepartmentForm;
