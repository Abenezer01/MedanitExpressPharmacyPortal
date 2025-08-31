import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import Family from 'src/types/member/family';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import MemberAutocomplete from '../members/list/member-selector';

interface FamilyFormProps {
  formik: FormikProps<Family>;
  isLocaleEdit?: boolean;
}

const FamilyForm: React.FC<FamilyFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('family-name')}
        placeholder={transl('enter-family-name')}
        name="name"
        size="small"
        sx={{ mb: 2 }}
      />
      <MemberAutocomplete
        label={transl("representative")}
        name="representative_id"
        member={formik.values.representative}
        sx={{ mb: 2 }}
        disabled={formik.values.id ? true : false}
      />


      <CustomTextBox
        fullWidth
        label={transl('description')}
        placeholder={transl('description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default FamilyForm;
