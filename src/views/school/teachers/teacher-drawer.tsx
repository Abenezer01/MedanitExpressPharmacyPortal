import * as yup from "yup";

import { FormikProps } from "formik";
import { Teacher } from "src/types/school/teacher";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import TeacherForm from "./teacher-form";
import teacherApiService from "src/services/school/teacher-api-service";

interface TeacherDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  teacherItem: Teacher;
}

const validationSchema = yup.object().shape({
  bio: yup.string().optional(),
  expertise: yup.string().optional(),
});

const TeacherDrawer = (props: TeacherDrawerType) => {
  // ** Props
  const { open, toggle, refetch, teacherItem } = props;
  console.log("editable teacher", teacherItem);

  const isEdit = teacherItem?.id ? true : false;

  const getPayload = (values: Teacher) => {
    const payload = {
      data: {
        ...values,
        id: teacherItem?.id,
        member_id: values.member_id,
        bio: values.bio,
        expertise: values.expertise,
      },
      files: [],
    };
    return payload;
  };
  const handleClose = () => {
    toggle();

    // formik.resetForm()
  };
  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };
  const updateTeacher = async (body: {
    data: Teacher;
    files: any[];
  }) => {
    return await teacherApiService.update(body.data.id, body);
  };
  const createTeacher = async (body: {
    data: Teacher;
    files: any[];
  }) => {
    return await teacherApiService.create(body);
  };
  return (
    <CustomSideDrawer
      title={isEdit ? "edit-teacher" : "create-teacher"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        teacherItem && (
          <FormPageWrapper
            edit={isEdit}
            title="teacher"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{
              ...teacherItem,
            } as Teacher}
            createActionFunc={isEdit ? updateTeacher : createTeacher}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Teacher>) => {
              return (
                <TeacherForm formik={formik} defaultLocaleData={{} as Teacher} />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default TeacherDrawer;
