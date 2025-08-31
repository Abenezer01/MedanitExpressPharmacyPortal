import * as yup from "yup";

import { FormikProps } from "formik";
import memberApiService from "src/services/member/member-service";
import LifeTestimoney from "src/types/member/life-testimoney";
import Member from "src/types/member/member";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import MemberLifeTestimoneyForm from "./testimoney-form";

interface MemberLifeTestimoneyDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  member: Member;
  memberLifeTestimoney: LifeTestimoney;
}

const validationSchema = yup.object().shape({
  religious_background: yup.string().required(),
});

const MemberLifeTestimoneyDrawer = (props: MemberLifeTestimoneyDrawerType) => {
  // ** Props
  const { open, toggle, refetch, memberLifeTestimoney, member } = props;

  const updateMemberLifeTestimoney = async (body: {
    data: LifeTestimoney;
    files: any[];
  }) => {
    return await memberApiService.updateMemberLifeTestimoney(
      body.data.id,
      body,
    );
  };
  const isEdit = memberLifeTestimoney?.id ? true : false;

  const getPayload = (values: LifeTestimoney) => {
    const payload = {
      data: {
        id: memberLifeTestimoney?.id,
        religious_background: values.religious_background,
        date_of_salvation: values.date_of_salvation,
        has_baptized: values.has_baptized,
        has_been_member: values.has_been_member,
        church_name: values.church_name,
        church_city: values.church_city,
        church_phone: values.church_phone,
        church_country: values.church_country,
        reason_of_departure: values.reason_of_departure,
        has_departure_letter: values.has_departure_letter,
        reason_nottohave_letter: values.reason_nottohave_letter,
        reason_to_be_member: values.reason_to_be_member,
        member_id: member.id,
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
        memberLifeTestimoney && (
          <FormPageWrapper
            edit={isEdit}
            title="member-life-testimoney"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={{ ...memberLifeTestimoney,church_phone:memberLifeTestimoney?.church_phone||"+251" } as LifeTestimoney}
            createActionFunc={updateMemberLifeTestimoney}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<LifeTestimoney>) => {
              return (
                <MemberLifeTestimoneyForm
                  formik={formik}
                  defaultLocaleData={{} as LifeTestimoney}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default MemberLifeTestimoneyDrawer;
