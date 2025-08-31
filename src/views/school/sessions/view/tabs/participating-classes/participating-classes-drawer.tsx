
import * as yup from "yup";

import { FormikProps } from "formik";
import sessionClassApiService from "src/services/school/session-class-api-service";
import { SessionClass } from "src/types/school/session-class";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import ParticipatingClassForm from "./participating-class-form";

interface ParticipatingClassDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  sessionClassItem: SessionClass;
  sessionId: string;
}

const validationSchema = yup.object().shape({
  topic: yup.string().required(),
  notes: yup.string().optional(),
});

const ParticipatingClassDrawer = (props: ParticipatingClassDrawerType) => {
  // ** Props
  const { open, toggle, refetch, sessionClassItem, sessionId } = props;
  console.log("editable class", sessionClassItem);

  const isEdit = sessionClassItem?.id ? true : false;

  const getPayload = (values: SessionClass) => {
    const payload = {
      data: {
        ...values,
        class_id: values.class_id,
        session_id: sessionId,
        topic: values.topic,
        notes: values.notes,
        teacher_ids: values.teacher_ids
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

  // You should use the sessionClassApiService for SessionClass operations
  // Replace classApiService with sessionClassApiService
  const updateSessionClass = async (body: {
    data: SessionClass;
    files: any[];
  }) => {
    return await sessionClassApiService.update(body.data.id, body);
  };
  const createSessionClass = async (body: {
    data: SessionClass;
    files: any[];
  }) => {
    return await sessionClassApiService.create(body);
  };

  return (
    <CustomSideDrawer
      title={isEdit ? "edit-session-class" : "register-session-class"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        sessionClassItem && (
          <FormPageWrapper
            edit={isEdit}
            title="session-class"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{
              ...sessionClassItem,
              teachers: sessionClassItem?.teachers || [],
              teacher_ids: sessionClassItem?.teachers?.map((teacher) => teacher.id) || [],
            } as SessionClass}
            createActionFunc={isEdit ? updateSessionClass : createSessionClass}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<SessionClass>) => {
              return (
                <ParticipatingClassForm formik={formik} />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};
export default ParticipatingClassDrawer;