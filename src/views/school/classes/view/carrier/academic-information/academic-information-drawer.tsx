import * as yup from "yup";

import { FormikProps } from "formik";
import moment from "moment";
import memberApiService from "src/services/member/member-service";
import AcademicInformation from "src/types/member/academic-information";
import Member from "src/types/member/member";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import AcademicInformationForm from "./academic-information-form";

interface AcademicInformationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  academicInformation: AcademicInformation;
  member: Member;
}

const validationSchema = yup.object().shape({
  level: yup.string().required(),
});

const AcademicInformationDrawer = (props: AcademicInformationDrawerType) => {
  // ** Props
  const { open, toggle, refetch, member, academicInformation } = props;
  const updateAcademicInformation = async (body: {
    data: AcademicInformation;
    files: any[];
  }) => {
    return await memberApiService.updateAcademicInformation(body.data.id, body);
  };
  const createAcademicInformation = async (body: {
    data: AcademicInformation;
    files: any[];
  }) => {
    return await memberApiService.createAcademicInformation(body);
  };

  const isEdit = academicInformation?.id ? true : false;

  const getPayload = (values: AcademicInformation) => {
    const payload = {
      data: {
        id: academicInformation?.id,
        member_id: member.id,
        type: values.type,
        level: values.level,
        institution: values.institution,
        started_year: values.started_year,
        completed_year: values.started_year,
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
        isEdit ? "edit-academic-information" : "create-academic-information"
      }
      handleClose={handleClose}
      open={open}
    >
      {() =>
        academicInformation && (
          <FormPageWrapper
            edit={isEdit}
            title="academic-information"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={
              {
                ...academicInformation,
                started_year: moment(academicInformation.completed_year).format(
                  "YYYY-MM-DD",
                ),
                completed_year: moment(
                  academicInformation.completed_year,
                ).format("YYYY-MM-DD"),
              } as AcademicInformation
            }
            createActionFunc={
              isEdit ? updateAcademicInformation : createAcademicInformation
            }
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<AcademicInformation>) => {
              return (
                <AcademicInformationForm
                  formik={formik}
                  defaultLocaleData={{} as AcademicInformation}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default AcademicInformationDrawer;
