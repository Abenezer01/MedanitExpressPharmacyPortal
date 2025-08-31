import * as yup from "yup";
import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import StudentForm from "./student-form";
import studentApiService from "src/services/school/student-api-service";
import { Student } from "src/types/school/student";

interface StudentDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  studentItem: Student;
}

const validationSchema = yup.object().shape({
  member_id: yup.string().required(),
  class_id: yup.string().nullable(),
});

const StudentDrawer = (props: StudentDrawerProps) => {
  const { open, toggle, refetch, studentItem } = props;
  const isEdit = !!studentItem?.id;

  const getPayload = (values: Student) => ({
    data: {
      ...values,
      id: studentItem?.id,
      member_id: values.member_id,
      class_id: values.class_id,
    },
    files: [],
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };

  const updateStudent = async (body: { data: Student; files: any[] }) => {
    return await studentApiService.update(studentItem.id , body);
  };

  const createStudent = async (body: { data: Student; files: any[] }) => {
    return await studentApiService.create(body);
  };

  return (
    <CustomSideDrawer
      title={isEdit ? "edit-student" : "create-student"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        studentItem && (
          <FormPageWrapper
            edit={isEdit}
            title="student"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{ ...studentItem } as Student}
            createActionFunc={isEdit ? updateStudent : createStudent}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Student>) => (
              <StudentForm formik={formik} />
            )}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default StudentDrawer;