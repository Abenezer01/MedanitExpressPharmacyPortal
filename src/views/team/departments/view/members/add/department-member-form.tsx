import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import Member from "src/types/member/member";
import TeamMember from "src/types/team/team-member";
import Position from "src/types/team/position";
import MemberAutocomplete from "src/views/member/members/list/member-selector";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomSwitch from "src/views/shared/form/custom-switch";

interface DepartmentMemberFormProps {
  formik: FormikProps<TeamMember>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Member;
  positions: Position[];
}

const DepartmentMemberForm: React.FC<DepartmentMemberFormProps> = ({
  formik,
  positions,
}) => {
  const { t: transl } = useTranslation();
  console.log("department user", formik.values);

  return (
    <>
      <MemberAutocomplete
        label={transl("member")}
        name="member_id"
        member={formik.values.member}
        sx={{ mb: 4 }}
        disabled={formik.values.id ? true : false}
      />
      <CustomSelect
        name="position_id"
        label={transl("position")}
        options={
          positions?.map((position) => ({
            value: position.id,
            label: position.name,
          })) || []
        }
        sx={{ mb: 2 }}
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
export default DepartmentMemberForm;
