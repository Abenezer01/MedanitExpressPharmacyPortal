import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { appModulesNames } from "src/configs/app-constants";
import Permission from "src/types/admin/role/permission";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomCheckboxGroup from "src/views/shared/form/custom-checkbox-group";

interface PermissionFormProps {
  formik: FormikProps<Permission>;
  isEdit?: boolean;
  defaultLocaleData?: Permission;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ formik, isEdit }) => {
  const { t: transl } = useTranslation();
  console.log("formik: ", formik.errors, formik.values);
  return (
    <>
      {
        isEdit ? (
          <CustomTextBox
            fullWidth
            label={transl("name")}
            placeholder={transl("name")}
            name="name"
            size="small"
            sx={{ mb: 2 }}
          />
        ) :
          <CustomCheckboxGroup
            name="name"
            label={transl("name") || ""}
            options={[
              { value: "create", label: transl("create") },
              { value: "update", label: transl("update") },
              { value: "read", label: transl("read") },
              { value: "delete", label: transl("delete") },
              { value: "export", label: transl("export") },
            ]}
            sx={{ mb: 2 }}
          />
      }
      <CustomTextBox
        fullWidth
        label={transl("model")}
        placeholder={transl("model")}
        name="model"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomSelect
        name="module"
        label={transl("module")}
        options={appModulesNames.map((type) => ({
          value: type,
          label: type.toUpperCase(),
        }))}
        sx={{ mb: 2 }}
      />

    </>
  );
};
export default PermissionForm;
