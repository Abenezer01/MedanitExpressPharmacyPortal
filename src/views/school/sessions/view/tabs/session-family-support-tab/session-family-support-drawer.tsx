import { FormikProps } from "formik";
import sessionFamilySupportApiService from "src/services/school/session-family-support-type-api-service";
import { SessionFamilySupport } from "src/types/school/family-support";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import SessionFamilySupportForm from "./session-family-support-form";

interface SupportFamilyDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  sessionFamilySupportItem: SessionFamilySupport;
  sessionId: string;
}

const validationSchema = yup.object().shape({
  family_id: yup.string().required("Family is required"),
  familySupportTypes: yup.array().of(
    yup.object().shape({
      id: yup.string().required("Support type is required"),
      SessionFamilySupportType: yup.object().shape({
        quantity: yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
      })
    })
  ),
});

const SupportFamilyDrawer = (props: SupportFamilyDrawerProps) => {
  const { open, toggle, refetch, sessionFamilySupportItem, sessionId } = props;
  const isEdit = !!sessionFamilySupportItem?.id;

  const getPayload = (values: SessionFamilySupport) => ({
    data: {
      ...values,
      session_id: sessionId,
      family_id: values.family_id,
      description: values.description,
      family_support_types: values.familySupportTypes?.map(fst => ({
        id: fst.id,
        SessionFamilySupportType: {
          quantity: fst.SessionFamilySupportType?.quantity
        }
      })),
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

  // Placeholder for API integration
  const updateSessionFamilySupport = async (body: { data: SessionFamilySupport; files: any[] }) => {
    return await sessionFamilySupportApiService.update(sessionFamilySupportItem.id, body);
  };

  const createSessionFamilySupport = async (body: { data: SessionFamilySupport; files: any[] }) => {
    return await sessionFamilySupportApiService.create(body);
  };

  return (
    <CustomSideDrawer
      title={isEdit ? "edit-session-family-support" : "create-session-family-support"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        sessionFamilySupportItem && (
          <FormPageWrapper
            edit={isEdit}
            title="session-family-support"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{ ...sessionFamilySupportItem } as SessionFamilySupport}
            createActionFunc={isEdit ? updateSessionFamilySupport : createSessionFamilySupport}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<SessionFamilySupport>) => (
              <SessionFamilySupportForm formik={formik} />
            )}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default SupportFamilyDrawer;