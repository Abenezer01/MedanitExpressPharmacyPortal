import { useQuery } from "@tanstack/react-query";
import memberApiService from "src/services/member/member-service";
import Member from "src/types/member/member";
import { defaultGetRequestParam } from "src/types/requests";

// Import necessary MUI components and icons
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "src/@core/components/icon";
import { ProfileTabCommonType } from "src/types/common";
import MaritalStatus, {
  MaritalStatusType,
} from "src/types/member/marital-status";
import MemberMaritalStatusDrawer from "./edit";
import Page from "src/views/components/page/page";
import { formatCalendar } from "src/utils/formatter/date";
import MemberProfileSmall from "src/views/member/members/member-profile-small";

const MemberMaritalStatus = ({
  member,
  isReadOnly = false,
}: {
  member: Member;
  isReadOnly?: boolean;
}) => {
  const { data: maritalStatus, refetch } = useQuery({
    queryKey: ["members-marital-status", member.id],
    queryFn: () =>
      memberApiService
        .getMaritalStatus(member.id, defaultGetRequestParam)
        .then((response) => response.payload),
  });

  return (
    <Page title="member-life-testimoney">
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {maritalStatus && (
                <TestimoneyOverview
                  isReadOnly={isReadOnly}
                  refetch={refetch}
                  maritalStatus={maritalStatus}
                  member={member}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default MemberMaritalStatus;

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
            {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)
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

// Function to generate Testimoney information
const generateMaritalStatusInfo = (maritalStatus: MaritalStatus, transl: any): ProfileTabCommonType[] =>
  [
    maritalStatus.status && {
      icon: "fas:heart", // Font Awesome heart icon
      value: maritalStatus.status,
      property: transl("Status"),
    },
    maritalStatus.status === MaritalStatusType.Married &&
    maritalStatus.date_of_marriage && {
      icon: "far:calendar", // Font Awesome calendar icon
      value: formatCalendar(maritalStatus.date_of_marriage),
      property: transl("date-of-marriage"),
    },
    maritalStatus.status === MaritalStatusType.Married &&
    maritalStatus.spouse && {
      icon: "fas:user", // Font Awesome user icon
      value: <MemberProfileSmall member={maritalStatus.spouse} />,
      property: transl("spouse-name"),
    },
    maritalStatus.status === MaritalStatusType.Married && (!maritalStatus.spouse) &&
    maritalStatus.spouse_name && {
      icon: 'fas:user', // Font Awesome user icon
      value: maritalStatus.spouse_name,
      property: 'spouse-name'
    },
    maritalStatus.status === MaritalStatusType.Married &&
    maritalStatus.spouse_phone && {
      icon: "fas:phone", // Font Awesome phone icon
      value: maritalStatus.spouse_phone,
      property: transl("spouse-phone"),
    },

    maritalStatus.status === MaritalStatusType.Married &&
    maritalStatus.spouse_church && {
      icon: 'fas:church', // Font Awesome church icon
      value: maritalStatus.spouse_church,
      property: 'spouse-church'
    }
    // Add more properties with suitable icons as needed
  ].filter(Boolean) as ProfileTabCommonType[];

// TestimoneyOverview component
const TestimoneyOverview = ({
  maritalStatus,
  refetch,
  member,
  isReadOnly,
}: {
  maritalStatus: MaritalStatus;
  refetch: () => void;
  member: Member;
  isReadOnly: boolean;
}) => {
  const { t: transl } = useTranslation();

  const [userAdressDrawerOpen, setUserTestimoneyOpen] =
    useState<boolean>(false);
  const toggleTestimoneyDrawer = () =>
    setUserTestimoneyOpen(!userAdressDrawerOpen);
  const handleEdit = () => {
    toggleTestimoneyDrawer();
  };

  return (
    <Fragment>
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
            {transl("marital-status-information")}
          </Typography>
          {!isReadOnly && (
            <IconButton onClick={handleEdit}>
              <Icon icon="tabler:edit" fontSize={20} />
            </IconButton>
          )}
        </Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            {renderList(generateMaritalStatusInfo(maritalStatus, transl))}
          </Grid>
        </Grid>
      </Box>

      {userAdressDrawerOpen && (
        <MemberMaritalStatusDrawer
          member={member}
          refetch={refetch}
          open={userAdressDrawerOpen}
          toggle={toggleTestimoneyDrawer}
          memberMaritalStatus={maritalStatus}
        />
      )}
    </Fragment>
  );
};
