import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import FamilyForm from './family-form';
import { IApiPayload } from 'src/types/requests';
import Family from 'src/types/member/family';
import familyApiService from 'src/services/member/family-service';

interface FamilyDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  family: Family;
}

const validationSchema = yup.object().shape({
  representative_id: yup.string().required('Representative is required'),
});

const FamilyDrawer = (props: FamilyDrawerType) => {
  // ** Props
  const { open, toggle, refetch, family } = props;

  const isEdit = family?.id ? true : false;
  const createFamily = async (body: IApiPayload<Family>) => {
    return await familyApiService.create(body);
  };
  const editFamily = async (body: IApiPayload<Family>) => {
    return await familyApiService.update(family?.id || '', body);
  };

  const getPayload = (values: Family) => {
    const payload = {
      data: {
        ...values,
        id: family?.id,
      },
      files: []
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
    <CustomSideDrawer title={`family.${isEdit ? 'edit-family' : 'create-family'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="family.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={family as Family}
          createActionFunc={isEdit ? editFamily : createFamily}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Family>) => {
            return <FamilyForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default FamilyDrawer;
