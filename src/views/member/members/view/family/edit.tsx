import * as yup from "yup";

import { FormikProps } from "formik";
import memberApiService from "src/services/member/member-service";
import MaritalStatus from "src/types/member/marital-status";
import Member from "src/types/member/member";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import MemberMaritalStatusForm from "./marital-status-form";

interface MemberMaritalStatusDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  member: Member;
  memberMaritalStatus: MaritalStatus;
}

const validationSchema = yup.object().shape({
  status: yup.string().required(),
});

const MemberMaritalStatusDrawer = (props: MemberMaritalStatusDrawerType) => {
  // ** Props
  const { open, toggle, refetch, memberMaritalStatus, member } = props;

  const updateMemberMaritalStatus = async (body: {
    data: MaritalStatus;
    files: any[];
  }) => {
    return await memberApiService.updateMemberStatus(body.data.id, body);
  };
  const isEdit = memberMaritalStatus?.id ? true : false;

  const getPayload = (values: MaritalStatus) => {
    console.log('marital values', values)
    const payload = {
      data: {
        ...values,
        id: memberMaritalStatus?.id,
        status: values.status,
        date_of_marriage: values.date_of_marriage,
        spouse_name: values.spouse_name,
        spouse_phone: values.spouse_phone,
        is_your_spouse_christian: values.is_your_spouse_christian,
        is_your_spouse_member: values.is_your_spouse_member,
        spouse_id: values.spouse_id,
        spouse_church: values?.spouse_church,
        member_id: member.id
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
      title={
        isEdit ? "edit-member-marital-status" : "create-member-marital-status"
      }
      handleClose={handleClose}
      open={open}
    >
      {() =>
        memberMaritalStatus && (
          <FormPageWrapper
            edit={isEdit}
            title="member-marital-status"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{ ...memberMaritalStatus } as MaritalStatus}
            createActionFunc={updateMemberMaritalStatus}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<MaritalStatus>) => {
              return (
                <MemberMaritalStatusForm
                  formik={formik}
                  defaultLocaleData={{} as MaritalStatus}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default MemberMaritalStatusDrawer;
