import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import ParentForm from "./parent-form";
import Parent from "src/types/child/parent";
import { IApiPayload, IApiResponse } from "src/types/requests";
import parentApiService from "src/services/child/parent-service";
import Child from "src/types/child/child";
import childParentApiService from "src/services/child/child-parent-service";

interface ParentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  parent: Parent;
  child: Child;
}

const validationSchema = yup.object().shape({
  relationship: yup.string().required(),
});

const ParentDrawer = (props: ParentDrawerType) => {
  // ** Props
  const { open, toggle, refetch, parent, child } = props;


  console.log(`Parent`, parent);
  const updateParent = async (body: {
    data: Parent;
    files: any[];
  }) => {
    return await parentApiService.update(body.data.id, body);
  };
  const createParent = async (body: {
    data: Parent;
    files: any[];
  }) => {
    return await parentApiService.create(body);
  };

  const isEdit = parent?.id ? true : false;

  const getPayload = (values: Parent) => {
    const payload = {
      data: {
        ...values
      },
      files: [],
    };

    return payload;
  };
  const handleClose = () => {
    toggle();
  };
  const onActionSuccess = async (response: IApiResponse<Parent>, payload: IApiPayload<Parent>) => {
    console.log('payload', response.payload)
    await childParentApiService.create({
      data: {
        child_id: child.id, parent_id: response.payload?.id, relationship: payload.data.relationship,
      },
      files: []
    });
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={isEdit ? "edit-parent" : "create-parent"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        parent && (
          <FormPageWrapper
            edit={isEdit}
            title="parent"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{ ...parent, is_parent_christian: parent.is_parent_christian || true, is_parent_member: parent.is_parent_member || true }}
            createActionFunc={isEdit ? updateParent : createParent}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Parent>) => {
              return (
                <ParentForm formik={formik} />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default ParentDrawer;
