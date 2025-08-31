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
import UserViewBilling from "src/views/admin/user/view/UserViewBilling";
import UserViewSecurity from "src/views/admin/user/view/UserViewSecurity";

// ** Types
import User from "src/types/admin/user";

interface Props {
  tab: string;
  user: User;
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

const UserViewRight = ({ tab, user, isLoading }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab);

  // ** Hooks
  const router = useRouter();

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value);
    router
      .push({
        pathname: `/admin/users/${user.id}/${value.toLowerCase()}`,
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
          value="account"
          label="Account"
          icon={<Icon fontSize="1.125rem" icon="tabler:user-check" />}
        />
        <Tab
          value="security"
          label="Security"
          icon={<Icon fontSize="1.125rem" icon="tabler:lock" />}
        />
        45
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
            <TabPanel sx={{ p: 0 }} value="security">
              <UserViewSecurity />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="billing-plan">
              <UserViewBilling />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  );
};

export default UserViewRight;
