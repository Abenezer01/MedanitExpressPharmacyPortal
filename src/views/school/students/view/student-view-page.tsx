// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types

// ** Demo Components Imports
import StudentViewLeft from "src/views/school/students/view/student-view-left";
import StudentViewRight from "./student-view-right";
import { Student } from "src/types/school/student";

type Props = {
  tab: string;
  student: Student;
  isLoading: boolean;
  onEdit: (student: Student) => void,
  onDelete: (id: string) => void,
};

const StudentViewPage = ({ tab, student, isLoading, onEdit, onDelete }: Props) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <StudentViewLeft onDelete={onDelete} onEdit={onEdit} student={student} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <StudentViewRight isLoading={isLoading} tab={tab} student={student} />
      </Grid>
    </Grid>
  );
};

export default StudentViewPage;
