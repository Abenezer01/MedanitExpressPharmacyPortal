import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { Class } from "src/types/school/class";
import CustomRadioBox from "src/views/shared/form/custom-radio-box";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface ClassFormProps {
  formik: FormikProps<Class>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Class;
}

const ClassForm: React.FC<ClassFormProps> = ({ formik }) => {
  console.log("formik: ", formik.errors, formik.values);
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl("title")}
        placeholder={transl("title")}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("description")}
        placeholder={transl("description")}
        name="description"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("level")}
        placeholder={transl("level")}
        name="level"
        type="number"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomRadioBox
        label={transl("active")}
        name="active"
        options={[
          { label: transl("active"), value: true },
          { label: transl("inactive"), value: false },
        ]}
      />
    </>
  );
};
export default ClassForm;
