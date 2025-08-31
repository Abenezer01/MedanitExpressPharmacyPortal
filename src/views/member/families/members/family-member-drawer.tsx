import * as yup from 'yup';

import { FormikProps } from 'formik';
import familyMemberApiService from 'src/services/member/family-member-service';
import { FamilyMember } from 'src/types/member/family';
import { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import FamilyMemberForm from './family-member-form';

interface FamilyMemberDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  familyMember: FamilyMember;
  familyId: string;
}

const validationSchema = yup.object().shape({
  member_id: yup.string().required(),
  family_role: yup.string().required(),
});

const FamilyMemberDrawer = (props: FamilyMemberDrawerType) => {
  // ** Props
  const { open, toggle, refetch, familyMember } = props;

  const isEdit = familyMember?.id ? true : false;
  const createFamilyMember = async (body: IApiPayload<FamilyMember>) => {
    return await familyMemberApiService.create(body);
  };
  const editFamilyMember = async (body: IApiPayload<FamilyMember>) => {
    return await familyMemberApiService.update(familyMember?.id || '', body);
  };

  const getPayload = (values: FamilyMember) => {
    const payload = {
      data: {
        ...values,
        id: familyMember?.id,
        family_id: props.familyId
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
    <CustomSideDrawer title={`${isEdit ? 'edit-family-member' : 'create-family-member'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="family.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={familyMember as FamilyMember}
          createActionFunc={isEdit ? editFamilyMember : createFamilyMember}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<FamilyMember>) => {
            return <FamilyMemberForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default FamilyMemberDrawer;
