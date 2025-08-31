import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import schoolAttendanceApiService from "src/services/school/school-attendance-api-service";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { SchoolAttendance } from "src/types/school/attendance";
import Session from "src/types/school/session";
import ItemsListing from "src/views/shared/listing";
import attendanceColumns from "./teacher-attendance-tab";

interface Props {
  session: Session;
}



const TeacherAttendanceTab = ({ session }: Props) => {
  const { t: transl } = useTranslation();
  const fetchAttendance = useCallback((params: GetRequestParam): Promise<IApiResponse<{ data: SchoolAttendance[], statistics: any }>> => {
    return schoolAttendanceApiService.getTeacherAttendance({ ...params, filter: { ...params.filter, session_id: session?.id } });
  }, [session?.id]);

  const {
    data: attendanceResponse,
    isLoading,
    refetch,
  } = usePaginatedFetch<{ data: SchoolAttendance[], statistics: any }>({
    queryKey: ["teacher-attendance", session?.id],
    fetchFunction: fetchAttendance,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [refetch]);
  const attendanceData = attendanceResponse?.data || [];
  const statistics = attendanceResponse?.statistics || {};

  const statisticsHeader = (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">{transl('Total')}</Typography>
            <Typography variant="h4">{statistics.totalAttendance || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">{transl('Present')}</Typography>
            <Typography variant="h4">{statistics.presentCount || 0}</Typography>
            <Typography variant="body2">{statistics.presentPercentage || '0.00'}%</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">{transl('Absent')}</Typography>
            <Typography variant="h4">{statistics.absentCount || 0}</Typography>
            <Typography variant="body2">{statistics.absentPercentage || '0.00'}%</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ mt: 2 }}>
      {statisticsHeader}
      <ItemsListing
        type="table"
        dataConfig={{
          items: attendanceData,
          isLoading: isLoading,
        }}
        tableConfig={{
          headers: attendanceColumns(transl),
        }}
        headerConfig={{
          title: transl('Teacher Attendance') || '',
        }}
        createActionConfig={
          {
            show: false
          }
        }
      />
      {attendanceData.length === 0 && !isLoading && (
        <Typography sx={{ mt: 4 }}>{transl("No teacher attendance records found.")}</Typography>
      )}
    </Box>
  );
};

export default TeacherAttendanceTab;

