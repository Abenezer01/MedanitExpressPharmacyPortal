import * as yup from "yup";

import { FormikProps } from "formik";
import useMember from "src/hooks/member/member-hook";
import Member from "src/types/member/member";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import ChurchServiceForm from "./church-service-form";

interface MemberChurchServiceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  member: Member;
}

const validationSchema = yup.object().shape({
  church_service_history: yup.array(),
  church_service_wish: yup.array(),
});

const MemberChurchServiceDrawer = (props: MemberChurchServiceDrawerType) => {
  // ** Props
  const { open, toggle, refetch, member } = props;

  const { updateMember } = useMember();
  const isEdit = member?.id ? true : false;

  const getPayload = (values: Member) => {
    const payload = {
      data: {
        ...values,
        id: member?.id,
        church_service_history: values.church_service_history,
        church_service_wish: values.church_service_wish,
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
        isEdit ? "edit-member-life-testimoney" : "create-member-life-testimoney"
      }
      handleClose={handleClose}
      open={open}
    >
      {() =>
        member && (
          <FormPageWrapper
            edit={isEdit}
            title="member-life-testimoney"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={
              {
                church_service_history: member.church_service_history,
                church_service_wish: member.church_service_wish,
              } as Member
            }
            createActionFunc={updateMember}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Member>) => {
              return (
                <ChurchServiceForm
                  formik={formik}
                  defaultLocaleData={{} as Member}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default MemberChurchServiceDrawer;
