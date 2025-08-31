import { Box } from "@mui/material";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import Role from "src/types/admin/role";
import User from "src/types/admin/user";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface UserFormProps {
  formik: FormikProps<User>;
  isEdit?: boolean;
  defaultLocaleData?: User;
  roles: Role[]
}

const UserForm: React.FC<UserFormProps> = ({ isEdit, roles }) => {
  const { t: transl } = useTranslation();

  return (
    <>
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
        label={transl("last_name")}
        placeholder={transl("last_name")}
        name="last_name"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        type="email"
        label={transl("email")}
        placeholder={transl("email")}
        name="email"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomPhoneInput name="phone" label={transl("phone")} sx={{ mb: 2 }}
      />
      <Box sx={{ mt: 4 }}>
        <CustomSelect
          name="role_id"
          label={transl("role")}
          options={
            roles?.map((role) => ({
              value: role.id,
              label: role.name,
            })) || []
          }
          sx={{ mt: 2 }}
        />
      </Box>
      {!isEdit && (
        <CustomTextBox
          fullWidth
          type="password"
          label={transl("password")}
          placeholder={transl("password")}
          name="password"
          size="small"
          sx={{ mb: 2 }}
        />
      )}
    </>
  );
};
export default UserForm;
