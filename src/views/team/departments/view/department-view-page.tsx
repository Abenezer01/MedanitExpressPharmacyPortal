// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types

// ** Demo Components Imports
import DepartmentViewLeft from "./department-view-left";
import DepartmentViewRight from "./department-view-right";
import Department from "src/types/team/department";
import Page from "src/views/components/page/page";

type Props = {
  tab: string;
  department: Department;
  isLoading: boolean;
};

const DepartmentView = ({ tab, department, isLoading }: Props) => {
  return (
    <Page title={`${department?.name} | department`}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <DepartmentViewLeft department={department} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <DepartmentViewRight
            isLoading={isLoading}
            tab={tab}
            department={department}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default DepartmentView;
