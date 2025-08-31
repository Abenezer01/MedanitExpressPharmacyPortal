import React from 'react';
import { useQuery } from '@tanstack/react-query';
import weeklyReportApiService from 'src/services/team/weekly-report-service';
import {
    Box,
    CircularProgress,
    Grid,
    Typography,
    Tooltip,
    Divider,
} from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import AttendanceCounter from './attendance-counter';

interface SmallTeamAttendanceProps {
    memberId: string;
    year: number;
}

const SmallTeamAttendance: React.FC<SmallTeamAttendanceProps> = ({ memberId, year }) => {
    const { t: transl } = useTranslation();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['yearly-member-attendance', memberId, year],
        queryFn: () => weeklyReportApiService.getYearlyMemberAttendance(memberId, year, {}),
    });

    const formattedData =
        data?.payload?.map((item: any) => {
            if (item?.date) {
                const date = new Date(item.date);
                const weekNumber = moment(date).week(); // Calculate the week number based on the date
                return {
                    week: weekNumber,
                    value: item?.status === 1 ? 1 : item?.status === 0 ? 0 : null, // Attendance status
                };
            }
            return null;
        }).filter((item: null) => item !== null) || [];
    const months = Array.from({ length: 12 }, (_, monthIndex) => {
        const startOfMonth = moment().year(year).month(monthIndex).startOf('month');
        const endOfMonth = moment().year(year).month(monthIndex).endOf('month');
        const weeks = new Set<number>();

        for (let date = startOfMonth; date.isBefore(endOfMonth); date.add(1, 'day')) {
            weeks.add(date.week());
        }

        return {
            name: startOfMonth.format('MMM'),
            weeks: Array.from(weeks),
        };
    });

    const getColor = (value: number | null) => {
        if (value === 1) return 'success.main'; // Green for Present
        if (value === 0) return 'error.main'; // Red for Absent
        return 'grey.400'; // Gray for N/A
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                {transl('small-team-attendance')}
            </Typography>
            <AttendanceCounter attendanceData={formattedData} />
            <Divider sx={{ marginBottom: 3 }} />
            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                    <CircularProgress />
                </Box>
            )}
            {isError && (
                <Typography variant="h6" color="error" align="center">
                    {transl('error-loading-data')}
                </Typography>
            )}
            {!isLoading && !isError && (
                <Grid container spacing={2} sx={{ overflowX: 'auto' }}>
                    {months.map((month, monthIndex) => (
                        <Grid item key={monthIndex} md={1}>
                            <Typography variant="h6" align="center" gutterBottom>
                                {month.name}
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap={1}
                            >
                                {month.weeks.map((weekNumber) => {
                                    const attendance = formattedData.find(
                                        (item: { week: number }) => item.week === weekNumber
                                    );
                                    return (
                                        <Tooltip
                                            key={weekNumber}
                                            title={`${transl('week')} ${weekNumber}: ${attendance?.value === 1
                                                ? transl('present')
                                                : attendance?.value === 0
                                                    ? transl('absent')
                                                    : transl('none')
                                                }`}
                                        >
                                            <Box
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    backgroundColor: getColor(attendance?.value),
                                                    borderRadius: '50%',
                                                    border: '1px solid #ddd',
                                                }}
                                            />
                                        </Tooltip>
                                    );
                                })}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};
export default SmallTeamAttendance;
