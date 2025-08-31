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
import Member from "src/types/member/member";
import CarrierComponent from "./carrier";
import MemberAboutOverview from "./general-profile";
import MemberContactComponent from "./member-contact";
import SocialMedias from "./social-medias";
import MemberLifeTestimoney from "./life-testimoney";
import MemberAddress from "./member-address";
import MemberMaritalStatus from "./family";

// ** Types

interface Props {
  tab: string;
  member: Member;
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

const MemberViewRight = ({ tab, member, isLoading }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab);
  const { t: transl } = useTranslation();

  // ** Hooks
  const router = useRouter();

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value);
    router
      .push({
        pathname: `/member/members/${member?.id}/${value.toLowerCase()}`,
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
          value="general"
          label={transl("general")}
          icon={<Icon fontSize="1.125rem" icon="tabler:list-details" />}
        />
        <Tab
          value="address"
          label={transl("address")}
          icon={<Icon fontSize="1.125rem" icon="tabler:map-pins" />}
        />
        <Tab
          value="social-medias"
          label={transl("social")}
          icon={<Icon fontSize="1.125rem" icon="tabler:social" />}
        />
        <Tab
          value="member-contacts"
          label={transl("contacts")}
          icon={<Icon fontSize="1.125rem" icon="tabler:address-book" />}
        />
        <Tab
          value="carrier"
          label={transl("carrier")}
          icon={<Icon fontSize="1.125rem" icon="tabler:school" />}
        />
        <Tab
          value="life-testimoney"
          label={transl("life-testimoney")}
          icon={<Icon fontSize="1.125rem" icon="tabler:heart" />}
        />
        <Tab
          value="family"
          label={transl("family")}
          icon={<Icon fontSize="1.125rem" icon="tabler:friends" />}
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
            <TabPanel sx={{ p: 0 }} value="general">
              <MemberAboutOverview member={member} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="address">
              <MemberAddress member={member} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="social-medias">
              <SocialMedias member={member} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="member-contacts">
              <MemberContactComponent member={member} />
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value="carrier">
              <CarrierComponent member={member} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="life-testimoney">
              <MemberLifeTestimoney member={member} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="family">
              <MemberMaritalStatus member={member} />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  );
};

export default MemberViewRight;
