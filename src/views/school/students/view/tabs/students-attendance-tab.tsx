import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import schoolAttendanceApiService from "src/services/school/school-attendance-api-service";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { AttendanceStatus, AttendanceUserType } from "src/types/school/attendance";
import { Student } from "src/types/school/student";
import ItemsListing from "src/views/shared/listing";
import { studentsAttendanceColumns } from "./students-attendance-row";

interface Props {
    student: Student;
}

const StudentsAttendanceTab = ({ student }: Props) => {
    const { t: transl } = useTranslation();
    const theme = useTheme();

    const fetchAttendance = useCallback((params: GetRequestParam): Promise<IApiResponse<any[]>> => {
        return schoolAttendanceApiService.getAll({ ...params, filter: { ...params.filter, student_id: student.id, user_type: AttendanceUserType.Student } });
    }, [student.id]);

    const {
        data: attendanceRecords,
        isLoading,
        pagination,
        handlePageChange,
    } = usePaginatedFetch<any[]>({
        queryKey: ['students-attendance', student.id],
        fetchFunction: fetchAttendance,
    });



    return (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {(() => {
                    const summary = { Present: 0, Absent: 0, Late: 0, Unknown: 0 };
                    (attendanceRecords || []).forEach((rec: any) => {
                        const status = (rec.attendance_status || "Unknown").toLowerCase();
                        if (status === AttendanceStatus.Present) summary.Present++;
                        else if (status === AttendanceStatus.Absent) summary.Absent++;
                        else if (status === AttendanceStatus.Late) summary.Late++;
                        else summary.Unknown++;
                    });
                    const total = (attendanceRecords || []).length;
                    return [
                        { label: transl('Present'), value: summary.Present, color: theme.palette.success.main },
                        { label: transl('Absent'), value: summary.Absent, color: theme.palette.error.main },
                        { label: transl('Late'), value: summary.Late, color: theme.palette.warning.main },
                        { label: transl('Unknown'), value: summary.Unknown, color: theme.palette.grey[500] },
                        { label: transl('Total'), value: total, color: theme.palette.primary.main },
                    ].map((item, idx) => (
                        <Grid item xs={6} sm={2.4} key={idx}>
                            <Card sx={{ borderLeft: `6px solid ${item.color}` }}>
                                <CardContent>
                                    <Typography variant="h6">{item.label}</Typography>
                                    <Typography variant="h4">{item.value}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ));
                })()}
            </Grid>
            <ItemsListing
                type="table"
                dataConfig={{
                    items: attendanceRecords || [],
                    isLoading: isLoading,
                }}
                tableConfig={{
                    headers: studentsAttendanceColumns(transl),
                }}
                paginationConfig={{
                    pagination: pagination,
                    onChange: handlePageChange,
                }}
                headerConfig={{
                    title: transl('Attendance') || '',
                }}
                createActionConfig={{ show: false }}
            />

        </Box>
    );
};

export default StudentsAttendanceTab;