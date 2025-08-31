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
import SmallTeam from "src/types/team/small-team";

// import SubSmallTeamView from './SubSmallTeams';
import SmallTeamMembersView from "./members";
import { useTranslation } from "react-i18next";
import WeeklyReportList from "./weekly-report";
import SmallTeamAddress from "./small-team-address";

// ** Demo Components Imports

// ** Types

interface Props {
  tab: string;
  smallTeam: SmallTeam;
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

const SmallTeamViewRight = ({ tab, smallTeam, isLoading }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab);
  const { t: transl } = useTranslation();

  // ** Hooks
  const router = useRouter();

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value);
    router
      .push({
        pathname: `/team/small-teams/list/${smallTeam.id}/${value.toLowerCase()}`,
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
          value="members"
          label={transl("members")}
          icon={<Icon fontSize="1.125rem" icon="tabler:users" />}
        />
        <Tab
          value="weekly-reports"
          label={transl("weekly-report")}
          icon={<Icon fontSize="1.125rem" icon="tabler:report" />}
        />

        <Tab
          value="address"
          label={transl("address")}
          icon={<Icon fontSize="1.125rem" icon="tabler:map-pins" />}
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
            <TabPanel sx={{ p: 0 }} value="members">
              <SmallTeamMembersView smallTeam={smallTeam} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="weekly-reports">
              <WeeklyReportList smallTeam={smallTeam} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="address">
              <SmallTeamAddress smallTeam={smallTeam} />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  );
};

export default SmallTeamViewRight;
