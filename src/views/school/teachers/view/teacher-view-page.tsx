// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types

// ** Demo Components Imports
import TeacherViewRight from "./teacher-view-right";
import { Teacher } from "src/types/school/teacher";
import TeacherViewLeft from "./teacher-view-left";

type Props = {
  tab: string;
  teacher: Teacher;
  isLoading: boolean;
  onEdit: (teacher: Teacher) => void,
  onDelete: (id: string) => void,
};

const TeacherViewPage = ({ tab, teacher, isLoading, onEdit, onDelete }: Props) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <TeacherViewLeft onDelete={onDelete} onEdit={onEdit} teacher={teacher} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <TeacherViewRight isLoading={isLoading} tab={tab} teacher={teacher} />
      </Grid>
    </Grid>
  );
};

export default TeacherViewPage;
