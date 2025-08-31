import * as yup from "yup";

import { FormikProps } from "formik";
import useMember from "src/hooks/member/member-hook";
import Member from "src/types/member/member";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import MemberForm from "./member-form";
import moment from "moment";

interface MemberDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  member: Member;
}

const validationSchema = yup.object().shape({
  first_name: yup.string().required(),
  middle_name: yup.string().required(),
  last_name: yup.string().required(),
  birth_date: yup.date().required(),
  gender: yup.string().required(),
  status: yup.string().required(),
});

const MemberDrawer = (props: MemberDrawerType) => {
  // ** Props
  const { open, toggle, refetch, member } = props;
  console.log("editable member", member);

  const { addNewMember, updateMember } = useMember();

  const isEdit = member?.id ? true : false;

  const getPayload = (values: Member) => {
    const payload = {
      data: {
        ...values,
        id: member?.id,
        registration_date: values.registration_date,
        first_name: values.first_name,
        middle_name: values.middle_name,
        last_name: values.last_name,
        gender: values.gender,
        nationality: values.nationality,
        birth_date: values.birth_date,
        status: values.status,
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
      title={isEdit ? "edit-member" : "create-member"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        member && (
          <FormPageWrapper
            edit={isEdit}
            title="member"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={
              {
                ...member,
                birth_date: moment(member.birth_date).format("YYYY-MM-DD"),
                registration_date: moment(member.registration_date).format(
                  "YYYY-MM-DD",
                ),
              } as Member
            }
            createActionFunc={isEdit ? updateMember : addNewMember}
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
      }
    </CustomSideDrawer>
  );
};

export default MemberDrawer;
