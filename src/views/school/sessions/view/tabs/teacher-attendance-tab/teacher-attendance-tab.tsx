import { GridColDef } from "@mui/x-data-grid";
import Chip from "src/@core/components/mui/chip";
import { ThemeColor } from "src/@core/layouts/types";
import Member from "src/types/member/member";
import { AttendanceStatus } from "src/types/school/attendance";
import { formatToLongString } from "src/utils/formatter/date";
import MemberProfileSmall from "src/views/member/members/member-profile-small";

const attendanceStatusObj: Record<AttendanceStatus, ThemeColor> = {
  [AttendanceStatus.Present]: "success",
  
  [AttendanceStatus.Absent]: "error",
  
  [AttendanceStatus.Late]: "warning",
  
  [AttendanceStatus.Excused]: "info",

  };

const attendanceColumns = (transl: any): GridColDef[] => [
  {
    field: "teacher_name",
    headerName: transl("Teacher Name"),
    flex: 1,
    renderCell: ({ row }: { row: any }) => <MemberProfileSmall member={row.teacher?.member as Member} />,
  },
  {
    field: "attendance_status",
    headerName: transl("Status"),
    flex: 1,
    renderCell: ({ row }: { row: any }) =>    <Chip
    label={row.status || transl('Unknown')}
    color={attendanceStatusObj[row.status as AttendanceStatus] || 'default'}
    size="small"
  />,
  },
  {
    field: "attendance_time",
    headerName: transl("Time"),
    flex: 1,
    renderCell: ({ row }: { row: any }) => (typeof formatToLongString !== 'undefined' ? formatToLongString(row.attendance_date) : row.attendance_date) || "N/A",
  },
  {
    field: "actions",
    headerName: transl("Actions"),
    flex: 1,
    renderCell: () => '[Edit]',
  },
];

export default attendanceColumns;