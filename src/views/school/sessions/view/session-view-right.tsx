// ** React Imports
import { SyntheticEvent, useEffect, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import TabContext from "@mui/lab/TabContext";
import MuiTabList, { TabListProps } from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MuiTab, { TabProps } from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Demo Components Imports
import { useTranslation } from "react-i18next";
import Session from "src/types/school/session";
import ParticipatingClassesTab from "./tabs/participating-classes/participating-classes-tab";
import StudentAttendanceTab from "./tabs/student-attendance-tab";
import TeacherAttendanceTab from "./tabs/teacher-attendance-tab";
import SupportFamilyTab from "./tabs/session-family-support-tab/session-family-support-tab";
import GalleryTab from "./tabs/gallary-tab";

// ** Types

interface Props {
  tab: string;
  session: Session;
  isLoading: boolean;
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  flexDirection: "row",
  "& svg": {
    marginBottom: "0 !important",
    marginRight: theme.spacing(1.5),
  },
}));

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  borderBottom: "0 !important",
  "&, & .MuiTabs-scroller": {
    boxSizing: "content-box",
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`,
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-root": {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const SessionViewRight = ({ tab, session, isLoading }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab);
  const { t: transl } = useTranslation();

  // ** Hooks
  const router = useRouter();

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value);
    router
      .push({
        pathname: `/school/sessions/${session?.id}/${value.toLowerCase()}`,
      })
      .then(() => {
        event;
      });
  };

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <TabContext value={activeTab}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        aria-label="forced scroll tabs example"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Tab
          value="participating-classes"
          label={transl("Classes")}
          icon={<Icon fontSize="1.125rem" icon="tabler:users-group" />}
        />
        <Tab
          value="student-attendance-summary"
          label={transl("Student Attendance")}
          icon={<Icon fontSize="1.125rem" icon="tabler:clipboard-list" />}
        />
        <Tab
          value="teacher-attendance"
          label={transl("Teacher Attendance")}
          icon={<Icon fontSize="1.125rem" icon="tabler:chalkboard" />}
        />
        <Tab
          value="support-family-involvement"
          label={transl("Family")}
          icon={<Icon fontSize="1.125rem" icon="tabler:users" />}
        />
        <Tab
          value="photo-media-gallery"
          label={transl("Gallery")}
          icon={<Icon fontSize="1.125rem" icon="tabler:photo" />}
        />
      </TabList>
      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <Box
            sx={{
              mt: 6,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            <TabPanel sx={{ p: 0 }} value="participating-classes">
              <ParticipatingClassesTab session={session} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="student-attendance-summary">
              <StudentAttendanceTab session={session} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="teacher-attendance">
              <TeacherAttendanceTab session={session} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="support-family-involvement">
              <SupportFamilyTab session={session} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="photo-media-gallery">
              {/* Photo/Media Gallery Content */}
              <GalleryTab />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  );
};

export default SessionViewRight;
