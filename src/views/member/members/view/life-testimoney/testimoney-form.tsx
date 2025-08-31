import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { relegionList } from "src/configs/app-constants";
import LifeTestimoney from "src/types/member/life-testimoney";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomSwitch from "src/views/shared/form/custom-switch";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface LifeTestimoneyFormProps {
  formik: FormikProps<LifeTestimoney>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: LifeTestimoney;
}

const LifeTestimoneyForm: React.FC<LifeTestimoneyFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();
  const { values } = formik;
  values;

  return (
    <>
      <CustomSelect
        fullWidth
        label={transl("religious_background")}
        placeholder={transl("religious_background")}
        name="religious_background"
        size="small"
        options={relegionList.map((religion) => ({
          value: religion,
          label: religion,
        }))}
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl("date_of_salvation")}
        placeholder={transl("date_of_salvation")}
        name="date_of_salvation"
        type="date"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomSwitch
        fullWidth
        label={transl("has_baptized")}
        placeholder={transl("has_baptized")}
        name="has_baptized"
        type="checkbox"
        size="small"
        sx={{ mb: 2 }}
      />

      {formik.values.has_baptized && (
        <CustomTextBox
          fullWidth
          label={transl("has_baptized")}
          placeholder={transl("has_baptized")}
          name="date_of_baptism"
          type="date"
          size="small"
          sx={{ mb: 2 }}
        />
      )}

      <CustomSwitch
        fullWidth
        label={transl("has_been_member")}
        placeholder={transl("has_been_member")}
        name="has_been_member"
        type="checkbox"
        size="small"
        sx={{ mb: 2 }}
      />

      {formik.values.has_been_member && (
        <>
          <CustomTextBox
            fullWidth
            label={transl("church_name")}
            placeholder={transl("church_name")}
            name="church_name"
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomTextBox
            fullWidth
            label={transl("church_city")}
            placeholder={transl("church_city")}
            name="church_city"
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomPhoneInput
            fullWidth
            label={transl("church_phone")}
            placeholder={transl("church_phone")}
            name="church_phone"
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomTextBox
            fullWidth
            label={transl("church_country")}
            placeholder={transl("church_country")}
            name="church_country"
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomTextBox
            fullWidth
            label={transl("reason_of_departure")}
            placeholder={transl("reason_of_departure")}
            name="reason_of_departure"
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomSwitch
            fullWidth
            label={transl("has_departure_letter")}
            placeholder={transl("has_departure_letter")}
            name="has_departure_letter"
            type="checkbox"
            size="small"
            sx={{ mb: 2 }}
          />

          {formik.values.has_departure_letter ? (
            <CustomTextBox
              fullWidth
              label={transl("departure_letter")}
              placeholder={transl("departure_letter")}
              name="departure_letter"
              type="file"
              size="small"
              sx={{ mb: 2 }}
            />
          ) : (
            <CustomTextBox
              fullWidth
              label={transl("reason_nottohave_letter")}
              placeholder={transl("reason_nottohave_letter")}
              name="reason_nottohave_letter"
              size="small"
              sx={{ mb: 2 }}
            />
          )}

          <CustomTextBox
            fullWidth
            label={transl("reason_to_be_member")}
            placeholder={transl("reason_to_be_member")}
            name="reason_to_be_member"
            size="small"
            sx={{ mb: 2 }}
          />
        </>
      )}

      {/* Add other form fields as needed */}
    </>
  );
};

export default LifeTestimoneyForm;
