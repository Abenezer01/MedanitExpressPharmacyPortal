import * as yup from "yup";

import { FormikProps } from "formik";
import userHook from "src/hooks/admin/user-hook";
import User from "src/types/admin/user";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import UserForm from "./user-form";
import useRole from "src/hooks/admin/role-hook";

interface UserDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  user: User;
}

const validationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .number()
    .typeError("Contact Number field is required")
    .min(10)
    .required(),
});

const UserDrawer = (props: UserDrawerType) => {
  // ** Props
  const { open, toggle, refetch, user } = props;

  const { addNewUser, updateUser } = userHook();
  const { allRoles } = useRole();
  const isEdit = user?.id ? true : false;
  console.log("is edit", isEdit);

  const getPayload = (values: User) => {
    const payload = {
      data: {
        ...values,
        id: user?.id,
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
      title={isEdit ? "edit-user" : "create-user"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        user && (
          <FormPageWrapper
            edit={isEdit}
            title="user"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{ ...user, role_id: user?.roles && user?.roles.length > 0 ? user?.roles[0]?.id : '' }}
            createActionFunc={isEdit ? updateUser : addNewUser}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<User>) => {
              return (
                <UserForm
                  isEdit={isEdit}
                  formik={formik}
                  defaultLocaleData={{} as User}
                  roles={allRoles} />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer >
  );
};

export default UserDrawer;
