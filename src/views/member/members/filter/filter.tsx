// MemberFilterItems.tsx
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { FormikProps } from "formik";
import type { SyntheticEvent } from "react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MaritalStatusType } from "src/types/member/marital-status";
import Member from "src/types/member/member";
import CustomNumberRangeInput from "src/views/shared/form/custom-number-range";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomRadioBox from "src/views/shared/form/custom-radio-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface MemberFilterItemsProps {
  formik: FormikProps<Member>;
}

const MemberFilterItems: React.FC<MemberFilterItemsProps> = ({ }) => {
  const [value, setValue] = useState<string>("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { t: transl } = useTranslation();

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label="simple tabs example">
        <Tab value="1" label="Basic" />
        <Tab value="2" label="Advance" />
      </TabList>

      <TabPanel value="1">
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
          label={transl("middle_name")}
          placeholder={transl("middle_name")}
          name="middle_name"
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

        <CustomRadioBox
          label={"gender"}
          name="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <CustomNumberRangeInput
          name="ageRange"
          min={5}
          max={100}
          defaultValue={[18, 60]}
        />
        <CustomTextBox
          fullWidth
          label={transl("nationality")}
          placeholder={transl("nationality")}
          name="nationality"
          size="small"
          sx={{ mb: 2 }}
        />
                <Box sx={{ mb: 5 }} />
        <CustomRadioBox
          name="is_child"
          label={transl("is_child")}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
          sx={{ mb: 2 }}
        />
      </TabPanel>
      <TabPanel value="2">
        <CustomTextBox
          fullWidth
          type="email"
          label={transl("email")}
          placeholder={transl("email")}
          name="membercontacts.email"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomPhoneInput
          label={transl("phone")}
          sx={{ mb: 2 }}
          name="membercontacts.phone"
        />
        <Box sx={{ mb: 5 }} />
        <CustomSelect
          fullWidth
          label={transl("marital-status")}
          placeholder={transl("Status")}
          name="maritalinformations.status"
          size="small"
          options={Object.values(MaritalStatusType).map((status) => ({
            value: status,
            label: status,
          }))}
          sx={{ mb: 2, mt: 2 }}
        />
      </TabPanel>
    </TabContext>
  );
};

export default MemberFilterItems;