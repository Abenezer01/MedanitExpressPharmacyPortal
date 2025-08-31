import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { Session } from "src/types/school/session";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomDateSelector from "src/views/shared/form/custom-date-box";

interface SessionFormProps {
  formik: FormikProps<Session>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Session;
}

const SessionForm: React.FC<SessionFormProps> = ({ formik }) => {
  console.log("formik: ", formik.errors, formik.values);
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl("title")}
        placeholder={transl("title")}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomDateSelector
        fullWidth
        type="date"
        label={transl("date")}
        placeholder={transl("date")}
        name="date"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("start_time")}
        placeholder={transl("start_time")}
        name="start_time"
        type="time"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("end_time")}
        placeholder={transl("end_time")}
        name="end_time"
        type="time"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("notes")}
        placeholder={transl("notes")}
        name="notes"
        size="small"
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default SessionForm;
