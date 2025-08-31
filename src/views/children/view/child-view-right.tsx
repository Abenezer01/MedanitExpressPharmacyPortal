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
import Child from "src/types/child/child";
import MemberAboutOverview from "src/views/member/members/view/general-profile";
import ParentList from "./parents";


// ** Types

interface Props {
  tab: string;
  child: Child;
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

const ChildViewRight = ({ tab, child, isLoading }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab);
  const { t: transl } = useTranslation();

  // ** Hooks
  const router = useRouter();

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value);
    router
      .push({
        pathname: `/child/children/${child?.id}/${value.toLowerCase()}`,
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
          value="about"
          label={transl("about")}
          icon={<Icon fontSize="1.125rem" icon="tabler:list-details" />}
        />
        <Tab
          value="parent"
          label={transl("parent")}
          icon={<Icon fontSize="1.125rem" icon="tabler:list-details" />}
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
            <TabPanel sx={{ p: 0 }} value="about">
              <MemberAboutOverview member={child?.member} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="parent">
              <ParentList child={child} />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  );
};

export default ChildViewRight;
