import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import MemberAutocomplete from "src/views/member/members/list/member-selector";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface SmallTeamFormProps {
  formik: FormikProps<any>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: any;
}

const SmallTeamForm: React.FC<SmallTeamFormProps> = ({ formik }) => {
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
      <MemberAutocomplete
        label={transl("Host Member")}
        name="host_member_id"
        member={formik.values.hostmember}
        sx={{ mb: 2 }}
      />
      <MemberAutocomplete
        label={transl("Leader")}
        name="leader_id"
        member={formik.values.leader}
        sx={{ mb: 2 }}
      />
      <MemberAutocomplete
        label={transl("Sub Leader")}
        name="sub_leader_id"
        member={formik.values.subleader}
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default SmallTeamForm;
