import * as yup from "yup";

import { FormikProps } from "formik";
import { Class } from "src/types/school/class";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import ClassForm from "./class-form";
import classApiService from "src/services/school/class-api-service";

interface ClassDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  classItem: Class;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  level: yup.number().required(),
  active: yup.boolean().required(),
});

const ClassDrawer = (props: ClassDrawerType) => {
  // ** Props
  const { open, toggle, refetch, classItem } = props;
  console.log("editable class", classItem);

  const isEdit = classItem?.id ? true : false;

  const getPayload = (values: Class) => {
    const payload = {
      data: {
        ...values,
        id: classItem?.id,
        title: values.title,
        description: values.description,
        level: values.level,
        active: values.active,
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
  const updateClass = async (body: {
    data: Class;
    files: any[];
  }) => {
    return await classApiService.update(body.data.id, body);
  };
  const createClass = async (body: {
    data: Class;
    files: any[];
  }) => {
    return await classApiService.create(body);
  };
  return (
    <CustomSideDrawer
      title={isEdit ? "edit-class" : "create-class"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        classItem && (
          <FormPageWrapper
            edit={isEdit}
            title="class"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{
              ...classItem,
            } as Class}
            createActionFunc={isEdit ? updateClass : createClass}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Class>) => {
              return (
                <ClassForm formik={formik} defaultLocaleData={{} as Class} />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default ClassDrawer;
