import { FormikProps } from "formik";
import React from "react";
import { Student } from "src/types/school/student";
import MemberAutocomplete from "src/views/member/members/list/member-selector";
import CustomSelect from "src/views/shared/form/custom-select";
import { useQuery } from "@tanstack/react-query";
import classApiService from "src/services/school/class-api-service";
import { Class } from "src/types/school/class";
import { Box } from "@mui/system";

interface StudentFormProps {
  formik: FormikProps<Student>;
}

const StudentForm: React.FC<StudentFormProps> = ({ formik }) => {
  // Fetch classes for the class select
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: () => classApiService.getAll({}).then(res => res.payload || []),
  });

  return (
    <>
    <Box>
      <MemberAutocomplete
        name="member_id"
        label="Member"
        member={formik.values.member}
        placeholder="Select member"
        filter={{ is_child:1 }}
      />
      </Box>
    <Box sx={{mt:2}}>

      <CustomSelect
        name="class_id"
        label="Class"
        options={classes.map((cls: Class) => ({
          value: cls.id,
          label: cls.title,
        }))}
        placeholder="Select class"
        sx={{ mb: 2 }}
      />
      </Box>
    </>
  );
};

export default StudentForm;