import {
  // Import necessary MUI components and icons
  useState,
} from "react";
import Member from "src/types/member/member";

// Import necessary MUI components and icons
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Icon from "src/@core/components/icon";
import useMember from "src/hooks/member/member-hook";
import { ProfileTabCommonType } from "src/types/common";
import MemberChurchServiceDrawer from "./edit";

// import MemberChurchServiceDrawer from "./edit";

// Function to generate ChurchService information
const generateChurchServiceInfo = (
  churchServices: string[],
  transl: any,
): ProfileTabCommonType[] =>
  churchServices.map((service) => ({
    icon: "tabler:point",
    value: service,
    property: transl(service),
  }));

// ChurchServiceOverview component
const MemberChurchService = ({ member }: { member: Member }) => {
  const { t: transl } = useTranslation();
  const { useGetOneMember } = useMember();
  const { refetch } = useGetOneMember(member.id);
  const [userAdressDrawerOpen, setUserChurchServiceOpen] =
    useState<boolean>(false);
  const toggleChurchServiceDrawer = () =>
    setUserChurchServiceOpen(!userAdressDrawerOpen);
  const handleEdit = () => {
    toggleChurchServiceDrawer();
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mb: 4,
                color: "text.disabled",
                textTransform: "uppercase",
              }}
            >
              {transl("church-service-history")}
            </Typography>
            <IconButton onClick={handleEdit}>
              <Icon icon="tabler:edit" fontSize={20} />
            </IconButton>
          </Box>
          <Grid container>
            <Grid item xs={12} md={6}>
              {renderList(
                generateChurchServiceInfo(
                  member?.church_service_history || [],
                  transl,
                ),
              )}
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mb: 4,
                color: "text.disabled",
                textTransform: "uppercase",
              }}
            >
              {transl("church-service-wishlist")}
            </Typography>
            <IconButton onClick={handleEdit}>
              <Icon icon="tabler:edit" fontSize={20} />
            </IconButton>
          </Box>
          <Grid container>
            <Grid item xs={12} md={6}>
              {renderList(
                generateChurchServiceInfo(
                  member?.church_service_wish || [],
                  transl,
                ),
              )}
            </Grid>
          </Grid>
        </Box>

        {userAdressDrawerOpen && (
          <MemberChurchServiceDrawer
            member={member}
            refetch={refetch}
            open={userAdressDrawerOpen}
            toggle={toggleChurchServiceDrawer}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default MemberChurchService;

// Function to render a list of items
const renderList = (arr: ProfileTabCommonType[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          "&:not(:last-of-type)": { mb: 3 },
          "& svg": { color: "text.secondary" },
        }}
      >
        <Box sx={{ display: "flex", mr: 2 }}>
          <Icon fontSize="1.25rem" icon={item.icon} />
        </Box>

        <Box
          sx={{
            columnGap: 2,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 500, color: "text.secondary" }}>
            {`${
              item.property.charAt(0).toUpperCase() + item.property.slice(1)
            }:`}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>{item.value}</Typography>
        </Box>
      </Box>
    ));
  } else {
    return null;
  }
};
