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
import Department from "src/types/team/department";
import SubDepartmentView from "./sub-departments";
import DepartmentMemberList from "./members/index";
import PositionList from "./positions";
import DepartmentOrgChart from "./OrgChart";
import { useTranslation } from "react-i18next";

// ** Demo Components Imports

// ** Types

interface Props {
  tab: string;
  department: Department;
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

const DepartmentViewRight = ({ tab, department, isLoading }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab);
  const { t: transl } = useTranslation();

  // ** Hooks
  const router = useRouter();

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value);
    router
      .push({
        pathname: `/team/departments/${department.id}/${value.toLowerCase()}`,
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
          value="sub-departments"
          label={transl("sub-departments")}
          icon={<Icon fontSize="1.125rem" icon="tabler:components" />}
        />
        <Tab
          value="members"
          label={transl("members")}
          icon={<Icon fontSize="1.125rem" icon="tabler:users" />}
        />
        <Tab
          value="positions"
          label={transl("positions")}
          icon={<Icon fontSize="1.125rem" icon="tabler:circles" />}
        />
        <Tab
          value="org-chart"
          label={transl("org-chart")}
          icon={<Icon fontSize="1.125rem" icon="tabler:chart-grid-dots" />}
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
            <TabPanel sx={{ p: 0 }} value="sub-departments">
              <SubDepartmentView parentDepartment={department} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="members">
              <DepartmentMemberList department={department} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="positions">
              <PositionList department={department} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="org-chart">
              <DepartmentOrgChart department={department} />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  );
};

export default DepartmentViewRight;
