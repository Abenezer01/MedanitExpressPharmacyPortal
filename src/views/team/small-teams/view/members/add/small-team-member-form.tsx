import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import Member from "src/types/member/member";
import MemberAutocomplete from "src/views/member/members/list/member-selector";
import CustomSwitch from "src/views/shared/form/custom-switch";

interface SmallTeamMemberFormProps {
  formik: FormikProps<Member>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Member;
}

const SmallTeamMemberForm: React.FC<SmallTeamMemberFormProps> = ({
  formik,
}) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <MemberAutocomplete
        label={transl("member")}
        name="member_id"
        member={formik.values.member}
        sx={{ mb: 4 }}
        disabled={formik.values.id ? true : false}
      />

      <CustomSwitch
        label={transl("is-leader")}
        placeholder={transl("is-leader")}
        name="is_leader"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default SmallTeamMemberForm;
