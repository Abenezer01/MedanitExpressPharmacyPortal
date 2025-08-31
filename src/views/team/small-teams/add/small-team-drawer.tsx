import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import SmallTeamForm from "./small-team-form";
import SmallTeam from "src/types/team/small-team";
import useSmallTeam from "src/hooks/team/small-team-hook";

interface SmallTeamDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  smallTeam: SmallTeam;
  parentSmallTeamId?: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
});

const SmallTeamDrawer = (props: SmallTeamDrawerType) => {
  // ** Props
  const { open, toggle, refetch, smallTeam } = props;

  const { addNewSmallTeam, updateSmallTeam } = useSmallTeam();

  const isEdit = smallTeam?.id ? true : false;

  const getPayload = (values: SmallTeam) => {
    const payload = {
      data: {
        ...values,
        id: smallTeam?.id,
        name: values.name,
        leader_id: values.leader_id,
        sub_leader_id: values.sub_leader_id,
        host_member_id: values.host_member_id,
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
      title={isEdit ? "edit-small-team" : "create-small-team"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        smallTeam && (
          <FormPageWrapper
            edit={isEdit}
            title="small-team"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={smallTeam}
            createActionFunc={isEdit ? updateSmallTeam : addNewSmallTeam}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<SmallTeam>) => {
              return (
                <SmallTeamForm
                  formik={formik}
                  defaultLocaleData={{} as SmallTeam}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default SmallTeamDrawer;
