import { FormikProps } from "formik";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { professionalStatus } from "src/configs/app-constants";
import ProfessionalStatus from "src/types/member/professional-status";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomSwitch from "src/views/shared/form/custom-switch";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface ProfessionalStatusFormProps {
  formik: FormikProps<ProfessionalStatus>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: ProfessionalStatus;
}

const ProfessionalStatusForm: React.FC<ProfessionalStatusFormProps> = ({
  formik,
}) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomSelect
        name="status"
        label={transl("status")}
        options={professionalStatus.map((status) => ({
          value: status,
          label: status,
        }))}
        sx={{ mb: 2 }}
      />
      {formik.values.status === "Proffesional" && (
        <Fragment>
          <CustomTextBox
            fullWidth
            label={transl("occupation")}
            placeholder={transl("occupation")}
            name="occupation"
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomSwitch
            label={transl("employed")}
            placeholder={transl("employed")}
            name="employed"
            size="small"
            sx={{ mb: 2 }}
          />
          {formik.values.employed && (
            <CustomTextBox
              fullWidth
              label={transl("organization-name")}
              placeholder={transl("organization-name")}
              name="organization_name"
              size="small"
              sx={{ mb: 2 }}
            />
          )}

          <CustomSwitch
            label={transl("primary-livelihood")}
            placeholder={transl("primary-livelihood")}
            name="primary_livelihood"
            size="small"
            sx={{ mb: 2 }}
          />
        </Fragment>
      )}
    </>
  );
};
export default ProfessionalStatusForm;
