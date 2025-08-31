import * as yup from "yup";

import { FormikProps } from "formik";
import useSmallTeam from "src/hooks/team/small-team-hook";
import Member from "src/types/member/member";
import { IApiPayload } from "src/types/requests";
import SmallTeam from "src/types/team/small-team";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import SmallTeamMemberForm from "./small-team-member-form";

interface SmallTeamMemberDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  smallTeamMember: Member;
  smallTeam: SmallTeam;
}

const validationSchema = yup.object().shape({
  member_id: yup.string().required(),
});

const SmallTeamMemberDrawer = (props: SmallTeamMemberDrawerType) => {
  // ** Props
  const { open, toggle, refetch, smallTeamMember, smallTeam } = props;

  const { assignSmallTeamMember, updateSmallTeamMember } = useSmallTeam();


  const isEdit = smallTeamMember?.id ? true : false;

  const getPayload = (values: Member) => {
    const payload = {
      data: {
        ...values,
        small_team_id: smallTeam.id
      },
      files: [],
    };

    return payload as IApiPayload<Member>;
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
      title={isEdit ? "edit-small-team-member" : "create-small-team-member"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        smallTeamMember && (
          <FormPageWrapper
            edit={isEdit}
            title="small-team-member"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={
              smallTeamMember
            }
            createActionFunc={
              isEdit ? updateSmallTeamMember : assignSmallTeamMember
            }
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Member>) => {
              return (
                <SmallTeamMemberForm
                  formik={formik}
                  defaultLocaleData={smallTeamMember as Member}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default SmallTeamMemberDrawer;
