import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { Teacher } from "src/types/school/teacher";
import MemberAutocomplete from "src/views/member/members/list/member-selector";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface TeacherFormProps {
  formik: FormikProps<Teacher>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Teacher;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ formik }) => {
  console.log("formik: ", formik.errors, formik.values);
  const { t: transl } = useTranslation();

  return (
    <>
      <MemberAutocomplete
        label={transl("member")}
        name="member_id"
        member={formik.values.member}
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("bio")}
        placeholder={transl("Enter bio")}
        name="bio"
        size="small"
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("expertise")}
        placeholder={transl("Enter expertise")}
        name="expertise"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default TeacherForm;
