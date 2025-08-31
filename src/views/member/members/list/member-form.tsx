import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import Member, { MemberStatusType } from "src/types/member/member";
import CustomDateSelector from "src/views/shared/form/custom-date-box";
import CustomRadioBox from "src/views/shared/form/custom-radio-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface MemberFormProps {
  formik: FormikProps<Member>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Member;
}

const MemberForm: React.FC<MemberFormProps> = ({ formik }) => {
  console.log("formik: ", formik.errors, formik.values);
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomDateSelector
        fullWidth
        type="date"
        label={transl("registration_date")}
        placeholder={transl("registration_date")}
        name="registration_date"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("first_name")}
        placeholder={transl("first_name")}
        name="first_name"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("middle_name")}
        placeholder={transl("middle_name")}
        name="middle_name"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl("last_name")}
        placeholder={transl("last_name")}
        name="last_name"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomDateSelector
        fullWidth
        type="date"
        label={transl("birth_date")}
        placeholder={transl("birth_date")}
        name="birth_date"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomRadioBox
        label={"gender"}
        name="gender"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
      <CustomTextBox
        fullWidth
        label={transl("nationality")}
        placeholder={transl("nationality")}
        name="nationality"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomSelect
        name="status"
        label={transl("status")}
        options={Object.keys(MemberStatusType).map((type) => ({
          value: type,
          label: type.toUpperCase(),
        }))}
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default MemberForm;
