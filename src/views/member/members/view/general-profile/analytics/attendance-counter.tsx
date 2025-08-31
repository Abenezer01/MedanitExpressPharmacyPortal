import { Box, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const AttendanceCounter = ({ attendanceData }: { attendanceData: { week: number, value: number }[] }) => {
    const presentWeeks = attendanceData?.filter((item: { value: number }) => item.value === 1).map(item => item.week);
    const absentWeeks = attendanceData?.filter((item: { value: number }) => item.value === 0).map(item => item.week);
    const { t: transl } = useTranslation();
    return (
        <Box>
            <Box display="flex" justifyContent="center" gap={2}>
                <Tooltip title={transl('weeksPresent', { weeks: presentWeeks.join(', ') || transl('none') })}>
                    <Box textAlign="center">
                        <Typography variant="body1">{transl('present')}</Typography>
                        <Typography variant="h4">{presentWeeks.length}</Typography>
                    </Box>
                </Tooltip>
                <Tooltip title={transl('weeksAbsent', { weeks: absentWeeks.join(', ') || transl('none') })}>
                    <Box textAlign="center">
                        <Typography variant="body1">{transl('absent')}</Typography>
                        <Typography variant="h4">{absentWeeks.length}</Typography>
                    </Box>
                </Tooltip>
            </Box>
        </Box>
    );
};
export default AttendanceCounter