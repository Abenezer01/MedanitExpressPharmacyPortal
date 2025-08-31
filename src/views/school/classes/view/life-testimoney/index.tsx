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
import LifeTestimoney from "src/types/member/life-testimoney";
import MemberChurchService from "./church-service";
import MemberLifeTestimoneyDrawer from "./edit";
import Page from "src/views/components/page/page";

const MemberLifeTestimoney = ({
  member,
  isReadOnly = false,
}: {
  member: Member;
  isReadOnly?: boolean;
}) => {
  const { data: lifeTestimoney, refetch } = useQuery({
    queryKey: ["members-life-testimoney", member.id],
    queryFn: () =>
      memberApiService
        .getMemberLifeTestimoney(member.id, defaultGetRequestParam)
        .then((response) => response.payload),
  });

  return (
    <Page title="member-life-testimoney">
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {lifeTestimoney && (
                <TestimoneyOverview
                  isReadOnly={isReadOnly}
                  refetch={refetch}
                  lifeTestimoney={lifeTestimoney}
                  member={member}
                />
              )}
              <MemberChurchService member={member} isReadOnly={isReadOnly} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default MemberLifeTestimoney;

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

// Function to generate Testimoney information
const generateTestimoneyInfo = (
  lifeTestimoney: LifeTestimoney,
  transl: any,
): ProfileTabCommonType[] =>
  [
    lifeTestimoney.religious_background && {
      icon: "tabler:point",
      value: lifeTestimoney.religious_background,
      property: transl("religious_background"),
    },
    lifeTestimoney.date_of_salvation && {
      icon: "tabler:point",
      value: lifeTestimoney.date_of_salvation.toISOString(),
      property: transl("date_of_salvation"),
    },
    lifeTestimoney.has_baptized && {
      icon: "tabler:point",
      value: lifeTestimoney.has_baptized ? "Yes" : "No",
      property: transl("has_baptized"),
    },
    lifeTestimoney.has_been_member && {
      icon: "tabler:point",
      value: lifeTestimoney.has_been_member ? "Yes" : "No",
      property: transl("has_been_member"),
    },
    lifeTestimoney.church_name && {
      icon: "tabler:point",
      value: lifeTestimoney.church_name,
      property: transl("church_name"),
    },
    lifeTestimoney.church_city && {
      icon: "tabler:point",
      value: lifeTestimoney.church_city,
      property: transl("church_city"),
    },
    lifeTestimoney.church_phone && {
      icon: "tabler:point",
      value: lifeTestimoney.church_phone,
      property: transl("church_phone"),
    },
    lifeTestimoney.church_country && {
      icon: "tabler:point",
      value: lifeTestimoney.church_country,
      property: transl("church_country"),
    },
    lifeTestimoney.reason_of_departure && {
      icon: "tabler:point",
      value: lifeTestimoney.reason_of_departure,
      property: transl("reason_of_departure"),
    },
    lifeTestimoney.has_departure_letter && {
      icon: "tabler:point",
      value: lifeTestimoney.has_departure_letter ? "Yes" : "No",
      property: transl("has_departure_letter"),
    },
    lifeTestimoney.reason_nottohave_letter && {
      icon: "tabler:point",
      value: lifeTestimoney.reason_nottohave_letter,
      property: transl("reason_nottohave_letter"),
    },
    lifeTestimoney.reason_to_be_member && {
      icon: "tabler:point",
      value: lifeTestimoney.reason_to_be_member,
      property: transl("reason_to_be_member"),
    },
  ].filter(Boolean) as ProfileTabCommonType[];

// TestimoneyOverview component
const TestimoneyOverview = ({
  lifeTestimoney,
  refetch,
  member,
  isReadOnly = false,
}: {
  lifeTestimoney: LifeTestimoney;
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
            {transl("life-testimoney-information")}
          </Typography>
          {!isReadOnly && (
            <IconButton onClick={handleEdit}>
              <Icon icon="tabler:edit" fontSize={20} />
            </IconButton>
          )}
        </Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            {renderList(generateTestimoneyInfo(lifeTestimoney, transl))}
          </Grid>
        </Grid>
      </Box>

      {userAdressDrawerOpen && (
        <MemberLifeTestimoneyDrawer
          member={member}
          refetch={refetch}
          open={userAdressDrawerOpen}
          toggle={toggleTestimoneyDrawer}
          memberLifeTestimoney={lifeTestimoney}
        />
      )}
    </Fragment>
  );
};
