import { GridColDef } from "@mui/x-data-grid";

// ** React Imports

// ** Next Imports

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Icon Imports

// ** Store Imports

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";

// ** Utils Import

// ** Actions Imports

// ** Third Party Components

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Table Components Imports
import { AttendanceStatus, SchoolAttendance } from "src/types/school/attendance";



const attendanceStatusObj: Record<AttendanceStatus, ThemeColor> = {
    [AttendanceStatus.Present]: "success",
    [AttendanceStatus.Absent]: "error",
    [AttendanceStatus.Late]: "warning",
    [AttendanceStatus.Excused]: "info",
};

interface CellType {
    row: SchoolAttendance;
}

export const studentsAttendanceColumns = (

    transl: (item: string) => string,
) => {
    return [
        {
            flex: 0.25,
            minWidth: 280,
            field: "session",
            headerName: transl("session"),
            sortable: true,
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography sx={{ color: "text.secondary" }}>
                        {row?.session?.title || ""}
                    </Typography>
                );
            },
        },
        {
            flex: 0.2,
            minWidth: 180,
            field: "status",
            headerName: transl("attendance_status"),
            sortable: true,
            renderCell: ({ row }: CellType) => (
                <CustomChip
                    skin="light"
                    color={attendanceStatusObj[row.status] ? attendanceStatusObj[row.status] : "primary"}
                    label={row.status}
                    sx={{ textTransform: "capitalize" }}
                />
            ),
        },
        {
            flex: 0.15,
            minWidth: 120,
            field: "notes",
            headerName: transl("notes"),
            sortable: true,
            renderCell: ({ row }: CellType) => (
                <Typography sx={{ color: "text.secondary" }}>
                    {row.notes || ""}
                </Typography>
            ),
        },

    ] as GridColDef[];
};
