import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import MemberContact, { contactTypes } from "src/types/member/contact";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomSwitch from "src/views/shared/form/custom-switch";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface MemberContactFormProps {
  formik: FormikProps<MemberContact>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: MemberContact;
}

const MemberContactForm: React.FC<MemberContactFormProps> = ({}) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomSelect
        name="type"
        label="Type"
        options={contactTypes}
        sx={{ mb: 2 }}

        // other props as needed
      />
      <CustomTextBox
        fullWidth
        label={transl("email")}
        placeholder={transl("email")}
        name="email"
        type="email"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomPhoneInput label={transl("phone")} sx={{ mb: 2 }} name="phone" />
      <CustomSwitch
        sx={{ mb: 2 }}
        name="is_primary"
        label={transl("is_primary")}
        defaultChecked // You can pass any other Switch props here
      />
    </>
  );
};
export default MemberContactForm;
