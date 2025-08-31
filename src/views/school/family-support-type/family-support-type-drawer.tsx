import * as yup from "yup";
import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import FamilySupportTypeForm from "./family-support-type-form";
import { FamilySupportType } from "src/types/school/family-support";
import familySupportTypeApiService from "src/services/school/family-support-types-service";

interface FamilySupportTypeDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  familySupportTypeItem: FamilySupportType;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
});

const FamilySupportTypeDrawer = (props: FamilySupportTypeDrawerProps) => {
  const { open, toggle, refetch, familySupportTypeItem } = props;
  const isEdit = !!familySupportTypeItem?.id;

  const getPayload = (values: FamilySupportType) => ({
    data: {
      ...values,
      id: familySupportTypeItem?.id,
      name: values.name,
      description: values.description,
      created_at: values.created_at,
      updated_at: values.updated_at,
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

  const updateFamilySupportType = async (body: { data: FamilySupportType; files: any[] }) => {
    return await familySupportTypeApiService.update(familySupportTypeItem.id, body);
  };

  const createFamilySupportType = async (body: { data: FamilySupportType; files: any[] }) => {
    return await familySupportTypeApiService.create(body);
  };

  return (
    <CustomSideDrawer
      title={isEdit ? "edit-family-support-type" : "create-family-support-type"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        familySupportTypeItem && (
          <FormPageWrapper
            edit={isEdit}
            title="family-support-type"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{ ...familySupportTypeItem } as FamilySupportType}
            createActionFunc={isEdit ? updateFamilySupportType : createFamilySupportType}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<FamilySupportType>) => (
              <FamilySupportTypeForm formik={formik} />
            )}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default FamilySupportTypeDrawer;