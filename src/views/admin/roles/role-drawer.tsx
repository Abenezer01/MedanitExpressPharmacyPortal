import * as yup from "yup";

import { FormikProps } from "formik";
import useRole from "src/hooks/admin/role-hook";
import Role from "src/types/admin/role";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import RoleForm from "./role-form";

interface RoleDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  role: Role;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

const RoleDrawer = (props: RoleDrawerType) => {
  // ** Props
  const { open, toggle, refetch, role } = props;
  console.log(`RoleDrawer`, role)

  const { addNewRole, updateRole } = useRole();

  const isEdit = role?.id ? true : false;

  const getPayload = (values: Role) => {
    const payload = {
      data: {
        ...values,
        id: role?.id,
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
      title={isEdit ? "edit-role" : "create-role"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        role && (
          <FormPageWrapper
            edit={isEdit}
            title="role"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={role}
            createActionFunc={isEdit ? updateRole : addNewRole}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Role>) => {
              return (
                <RoleForm formik={formik} defaultLocaleData={{} as Role} />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default RoleDrawer;
