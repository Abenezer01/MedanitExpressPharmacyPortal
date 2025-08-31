import { Box, Chip, Stack, Typography } from "@mui/material";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "src/@core/components/icon";
import { ThemeColor } from "src/@core/layouts/types";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import schoolAttendanceApiService from "src/services/school/school-attendance-api-service";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { AttendanceStatus } from "src/types/school/attendance";
import Session from "src/types/school/session";
import MemberProfileSmall from "src/views/member/members/member-profile-small";

interface Props {
  session: Session;
}

function groupByClass(attendanceList: any[]) {
  const grouped: Record<string, { className: string; students: any[] }> = {};
  attendanceList.forEach((item) => {
    const classId = item.class_id || "Unknown";
    const className = item.class_name || classId;
    if (!grouped[classId]) grouped[classId] = { className, students: [] };
    grouped[classId].students.push(item);
  });
  return grouped;
}

function getAttendanceSummary(students: any[]) {
  const summary = { Present: 0, Absent: 0, Late: 0 };
  students.forEach((s) => {
    if (s.attendance_status === AttendanceStatus.Present) summary.Present++;
    else if (s.attendance_status === AttendanceStatus.Absent) summary.Absent++;
    else if (s.attendance_status === AttendanceStatus.Late) summary.Late++;
  });
  return summary;
}


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<Icon icon="tabler:arrow-down" fontSize={20} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const StudentAttendanceTab = ({ session }: Props) => {
  const { t: transl } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>(false);

  const fetchAttendance = useCallback((params: GetRequestParam): Promise<IApiResponse<any[]>> => {
    return schoolAttendanceApiService.getStudentAttendance({ ...params, filter: { ...params.filter, session_id: session?.id } });
  }, [session?.id]);

  const attendanceStatusObj: Record<AttendanceStatus, ThemeColor> = {
    [AttendanceStatus.Present]: "success",
    
    [AttendanceStatus.Absent]: "error",
    
    [AttendanceStatus.Late]: "warning",
    
    [AttendanceStatus.Excused]: "info",

    };
  const {
    data: students,
    isLoading,
    refetch,
  } = usePaginatedFetch<any[]>({
    queryKey: ['student-attendance', session?.id],
    fetchFunction: fetchAttendance,
  });

  const groupedByClass = useMemo(() => groupByClass(students || []), [students]);
  const classIds = Object.keys(groupedByClass);

  useEffect(() => {
    if (classIds.length > 0 && expanded === false) {
      setExpanded(classIds[0]);
    }
  }, [classIds, expanded]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <Box sx={{ mt: 2 }}>
      {classIds.length === 0 && !isLoading && (
        <Typography sx={{ mt: 4 }}>{transl('No student attendance records found.')}</Typography>
      )}
      {classIds.map((classId) => {
        const { className, students } = groupedByClass[classId];
        const summary = getAttendanceSummary(students);
        return (
          <Accordion
            key={classId}
            expanded={expanded === classId}
            onChange={() => setExpanded(expanded === classId ? false : classId)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary>
              <Typography sx={{ fontWeight: 600, color: 'hotpink' }}>
                {transl('Class')}: {className}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ ml: 3 }}>
                <Chip label={`${summary.Present} ${transl('Present')}`} color="success" size="small" />
                <Chip label={`${summary.Absent} ${transl('Absent')}`} color="error" size="small" />
                <Chip label={`${summary.Late} ${transl('Late')}`} color="warning" size="small" />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #eee' }}>{transl('Student Name')}</th>
                      <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #eee' }}>{transl('Status')}</th>
                      <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #eee' }}>{transl('Time')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((row: any, idx: number) => (
                      <tr key={row.member_id || idx} style={{ borderBottom: '1px solid #f5f5f5' }}>
                        <td style={{ padding: 8 }}><MemberProfileSmall route={`/school/students/${row.student_id}`} member={row.member} /> </td>
                        <td style={{ padding: 8 }}>
                          <Chip
                            label={row.attendance_status || transl('Unknown')}
                            color={attendanceStatusObj[row.attendance_status as AttendanceStatus] || 'default'}
                            size="small"
                          />
                        </td>
                        <td style={{ padding: 8 }}>{row.attendance_time || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {students.length === 0 && !isLoading && (
                  <Typography sx={{ mt: 2 }}>{transl('No students found in this class.')}</Typography>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default StudentAttendanceTab;