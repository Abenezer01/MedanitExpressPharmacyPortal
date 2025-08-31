import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import Role from "src/types/admin/role";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface RoleFormProps {
  formik: FormikProps<Role>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Role;
}

const RoleForm: React.FC<RoleFormProps> = ({}) => {
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
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default RoleForm;
