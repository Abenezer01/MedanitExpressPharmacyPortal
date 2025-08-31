import * as yup from "yup";

import { FormikProps } from "formik";
import usePermission from "src/hooks/admin/permission-hook";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import PermissionForm from "./permission-form";
import Permission from "src/types/admin/role/permission";

interface PermissionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  permission: Permission;
}

const PermissionDrawer = (props: PermissionDrawerType) => {
  // ** Props
  const { open, toggle, refetch, permission } = props;
  console.log("editable permission", permission);

  const { addNewPermission, updatePermission } = usePermission();

  const isEdit = permission?.id ? true : false;

  // Dynamic validation schema
  const validationSchema = yup.object().shape({
    name: isEdit
      ? yup.string().required()
      : yup.array().of(yup.string()).min(1, "Select at least one action").required("Required"),
    module: yup.string().required(),
    model: yup.string().required(),
  });

  const getPayload = (values: Permission) => {
    const payload = {
      data: {
        ...values,
        id: permission?.id,
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

  return (
    <CustomSideDrawer
      title={isEdit ? "edit-permission" : "create-permission"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        permission && (
          <FormPageWrapper
            edit={isEdit}
            title="permission"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={permission}
            createActionFunc={isEdit ? updatePermission : addNewPermission}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Permission>) => {
              return (
                <PermissionForm
                  isEdit={isEdit}
                  formik={formik}
                  defaultLocaleData={{} as Permission}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default PermissionDrawer;
