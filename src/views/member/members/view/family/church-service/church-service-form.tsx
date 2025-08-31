import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { churhcServicesList } from "src/configs/app-constants";
import Member from "src/types/member/member";
import CustomMultiSelect from "src/views/shared/form/custom-select-multi";

interface ChurchServiceFormProps {
  formik: FormikProps<Member>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Member;
}

const ChurchServiceForm: React.FC<ChurchServiceFormProps> = ({}) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomMultiSelect
        fullWidth
        multiple
        multiline
        label={transl("church_service_history")}
        placeholder={transl("church_service_history")}
        name="church_service_history"
        options={churhcServicesList.map((service) => ({
          value: service,
          label: service,
        }))}
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomMultiSelect
        fullWidth
        multiple
        multiline
        label={transl("church_service_wish")}
        placeholder={transl("church_service_wish")}
        name="church_service_wish"
        options={churhcServicesList.map((service) => ({
          value: service,
          label: service,
        }))}
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default ChurchServiceForm;
