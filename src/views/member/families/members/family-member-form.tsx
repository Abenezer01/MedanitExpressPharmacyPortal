import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { FamilyMember } from 'src/types/member/family';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import MemberAutocomplete from '../../members/list/member-selector';

interface FamilyMemberFormProps {
  formik: FormikProps<FamilyMember>;
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <MemberAutocomplete
        label={transl("member")}
        name="member_id"
        member={formik.values.member}
        sx={{ mb: 2 }}
        disabled={formik.values.id ? true : false}
      />
      <CustomTextBox
        fullWidth
        label={transl('family_role')}
        placeholder={transl('family_role')}
        name="family_role"
        size="small"
        sx={{ mb: 2 }}
      />

    </>
  );
};
export default FamilyMemberForm;
