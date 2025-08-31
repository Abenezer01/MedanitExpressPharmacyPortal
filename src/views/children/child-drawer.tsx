import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import { IApiPayload } from 'src/types/requests';
import Child from 'src/types/child/child';
import childApiService from 'src/services/child/child-service';
import MemberForm from 'src/views/member/members/list/member-form';
import Member from 'src/types/member/member';
import moment from 'moment';

interface ChildDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  child: Child;
}

const validationSchema = yup.object().shape({
  first_name: yup.string().required(),
  middle_name: yup.string().required(),
  last_name: yup.string().required(),
  birth_date: yup.date().required(),
  gender: yup.string().required(),
  status: yup.string().required(),
});

const ChildDrawer = (props: ChildDrawerType) => {
  // ** Props
  const { open, toggle, refetch, child } = props;

  const isEdit = child?.id ? true : false;
  const createChild = async (body: IApiPayload<Member>) => {
    return await childApiService.create({
      data: body.data,
      files: []
    });
  };
  const editChild = async (body: IApiPayload<Member>) => {
    return await childApiService.update(child?.id || '', {
      data: body.data,
      files: []
    });
  };

  const getPayload = (values: Member) => {
    const payload = {
      data: {
        ...values,
        id: child?.id,
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
    <CustomSideDrawer title={`child.${isEdit ? 'edit-child' : 'create-child'}`} handleClose={handleClose} open={open}>
      {() => (
        child && (
          <FormPageWrapper
            edit={isEdit}
            title="member"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={
              {
                ...child.member,
                birth_date: moment(child?.member?.birth_date).format("YYYY-MM-DD"),
                registration_date: moment(child?.member?.registration_date).format(
                  "YYYY-MM-DD",
                ),
              } as Member
            }
            createActionFunc={isEdit ? editChild : createChild}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Member>) => {
              return (
                <MemberForm formik={formik} defaultLocaleData={{} as Member} />
              );
            }}
          </FormPageWrapper>
        )
      )}
    </CustomSideDrawer>
  );
};

export default ChildDrawer;
