import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import PositionForm from "./position-form";
import Position from "src/types/team/position";
import usePosition from "src/hooks/team/position-hook";

interface PositionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  position: Position;
  departmentId?: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

const PositionDrawer = (props: PositionDrawerType) => {
  // ** Props
  const { open, toggle, position, departmentId } = props;

  const { addNewPosition, updatePosition } = usePosition();

  const isEdit = position?.id ? true : false;

  const getPayload = (values: Position) => {
    const payload = {
      data: {
        ...values,
        id: position?.id,
        name: values.name,
        description: values.description,
        department_id: departmentId || "",
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
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={isEdit ? "edit-position" : "create-position"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        position && (
          <FormPageWrapper
            edit={isEdit}
            title="position"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={position}
            createActionFunc={isEdit ? updatePosition : addNewPosition}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Position>) => {
              return (
                <PositionForm
                  formik={formik}
                  defaultLocaleData={{} as Position}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default PositionDrawer;
