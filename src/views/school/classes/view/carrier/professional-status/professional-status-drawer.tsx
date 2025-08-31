import * as yup from "yup";

import { FormikProps } from "formik";
import memberApiService from "src/services/member/member-service";
import Member from "src/types/member/member";
import ProfessionalStatus from "src/types/member/professional-status";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import ProfessionalStatusForm from "./professional-status-form";

interface ProfessionalStatusDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  professionalStatus: ProfessionalStatus;
  member: Member;
}

const validationSchema = yup.object().shape({
  status: yup.string().required(),
});

const ProfessionalStatusDrawer = (props: ProfessionalStatusDrawerType) => {
  // ** Props
  const { open, toggle, refetch, member, professionalStatus } = props;
  const updateProfessionalStatus = async (body: {
    data: ProfessionalStatus;
    files: any[];
  }) => {
    return await memberApiService.updateProfessionalStatus(body.data.id, body);
  };
  const createProfessionalStatus = async (body: {
    data: ProfessionalStatus;
    files: any[];
  }) => {
    return await memberApiService.createProfessionalStatus(body);
  };

  const isEdit = professionalStatus?.id ? true : false;
  console.log("is edit", isEdit);

  const getPayload = (values: ProfessionalStatus) => {
    console.log("values.occupation", values, values.occupation);
    const payload = {
      data: {
        id: professionalStatus.id,
        member_id: member.id,
        status: values.status,
        employed: values.employed,
        occupation: values.occupation,
        organization_name: values.organization_name,
        primary_livelihood: values.primary_livelihood,
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
      title={isEdit ? "edit-professional-status" : "create-professional-status"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        professionalStatus && (
          <FormPageWrapper
            edit={isEdit}
            title="professional-status"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={professionalStatus}
            createActionFunc={
              isEdit ? updateProfessionalStatus : createProfessionalStatus
            }
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<ProfessionalStatus>) => {
              return (
                <ProfessionalStatusForm
                  formik={formik}
                  defaultLocaleData={{} as ProfessionalStatus}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default ProfessionalStatusDrawer;
