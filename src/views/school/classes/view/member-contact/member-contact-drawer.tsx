import * as yup from "yup";

import { FormikProps } from "formik";
import memberApiService from "src/services/member/member-service";
import MemberContact from "src/types/member/contact";
import Member from "src/types/member/member";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import MemberContactForm from "./member-contact-form";

interface MemberContactDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  memberContact: MemberContact;
  member: Member;
}

const validationSchema = yup.object().shape({
  phone: yup.string().required(),
  type: yup.string().required(),
});

const MemberContactDrawer = (props: MemberContactDrawerType) => {
  // ** Props
  const { open, toggle, refetch, member, memberContact } = props;
  const updateMemberContact = async (body: {
    data: MemberContact;
    files: any[];
  }) => {
    return await memberApiService.updateMemberContact(body.data.id, body);
  };
  const createMemberContact = async (body: {
    data: MemberContact;
    files: any[];
  }) => {
    return await memberApiService.createMemberContact(body);
  };

  const isEdit = memberContact?.id ? true : false;

  const getPayload = (values: MemberContact) => {
    const payload = {
      data: {
        id: memberContact?.id,
        email: values.email,
        member_id: member.id,
        phone: values.phone,
        is_primary: values.is_primary,
        type: values.type,
      },
      files: [],
    };

    return payload;
  };
  const handleClose = () => {
    toggle();
  };
  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={isEdit ? "edit-member-contact" : "create-member-contact"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        memberContact && (
          <FormPageWrapper
            edit={isEdit}
            title="member-social-media"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={memberContact}
            createActionFunc={
              isEdit ? updateMemberContact : createMemberContact
            }
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<MemberContact>) => {
              return (
                <MemberContactForm
                  formik={formik}
                  defaultLocaleData={{} as MemberContact}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default MemberContactDrawer;
