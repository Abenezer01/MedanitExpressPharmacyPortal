import { Box } from "@mui/system";
import { FormikProps } from "formik";
import React from "react";
import { FamilySupportType } from "src/types/school/family-support";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface FamilySupportTypeFormProps {
  formik: FormikProps<FamilySupportType>;
}

const FamilySupportTypeForm: React.FC<FamilySupportTypeFormProps> = ({ formik }) => {

  return (
    <>
      <Box>

        <CustomTextBox
          name="name"
          label="Name"
          value={formik.values.name}
          placeholder="Enter name"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          name="description"
          label="Description"
          value={formik.values.description}
          multiline
          rows={4}
          placeholder="Enter description"
          sx={{ mb: 2 }}
        />

      </Box>
    </>
  );
};

export default FamilySupportTypeForm;