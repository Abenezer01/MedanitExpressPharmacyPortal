import * as yup from "yup";

import { FormikProps } from "formik";
import useDepartment from "src/hooks/team/department-hook";
import usePosition from "src/hooks/team/position-hook";
import Member from "src/types/member/member";
import TeamMember from "src/types/team/team-member";
import Department from "src/types/team/department";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import DepartmentMemberForm from "./department-member-form";

interface DepartmentMemberDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  departmentMember: TeamMember;
  department: Department;
}

const validationSchema = yup.object().shape({
  member_id: yup.string().required(),
  position_id: yup.string().required(),
});

const DepartmentMemberDrawer = (props: DepartmentMemberDrawerType) => {
  // ** Props
  const { open, toggle, refetch, departmentMember, department } = props;

  const { addDepartmentMember, updateDepartmentMember } = useDepartment();
  const { allPositions } = usePosition(
    {
      pagination: {
        page: 1,
        pageSize: 100,
      },
      filter: {
        department_id: department.id,
      }
    },
  );

  const isEdit = departmentMember?.id ? true : false;

  const getPayload = (values: TeamMember) => {
    const payload = {
      data: {
        ...values,
        id: departmentMember?.id,
        is_leader: values.is_leader,
        model_id: department.id,
        position_id: values.position_id,
        member_id: values.member_id,
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
      title={isEdit ? "edit-department-member" : "create-department-member"}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        departmentMember && (
          <FormPageWrapper
            edit={isEdit}
            title="department-member"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={
              {
                ...departmentMember,
              } as TeamMember
            }
            createActionFunc={
              isEdit ? updateDepartmentMember : addDepartmentMember
            }
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<TeamMember>) => {
              return (
                <DepartmentMemberForm
                  formik={formik}
                  positions={allPositions || []}
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

export default DepartmentMemberDrawer;
