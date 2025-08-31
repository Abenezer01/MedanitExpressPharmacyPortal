import { FormikProps } from "formik";
import React from "react";
import { SessionClass } from "src/types/school/session-class";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomMultiSelect from "src/views/shared/form/custom-select-multi";
import { Teacher } from "src/types/school/teacher";
import teacherApiService from "src/services/school/teacher-api-service";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface ParticipatingClassFormProps {
  formik: FormikProps<SessionClass>;
}

const ParticipatingClassForm: React.FC<ParticipatingClassFormProps> = ({
  formik
}) => {
  formik;
  const { t: transl } = useTranslation();
  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => teacherApiService.getAll({}).then(res => res.payload || []),
  });

  return (
    <>
      <CustomTextBox
        fullWidth
        label="Topic"
        placeholder="Topic"
        name="topic"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label="Notes"
        placeholder="Notes"
        name="notes"
        size="small"
        sx={{ mb: 2 }}
        multiline
        rows={3}
      />
      <CustomMultiSelect
        fullWidth
        multiple
        label={transl("teacher")}
        placeholder={transl("teacher")}
        name="teacher_ids"
        options={teachers.map((teacher: Teacher) => ({
          value: teacher.id,
          label: teacher.member?.full_name || teacher.id,
        }))}
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default ParticipatingClassForm;