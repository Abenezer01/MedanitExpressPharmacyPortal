// ** MUI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Types
import { useTranslation } from "react-i18next";
import { ProfileTabCommonType } from "src/types/common";
import MemberContact from "src/types/member/contact";
import Member from "src/types/member/member";
import { formatDate } from "src/utils/formatter/date";
import Page from "src/views/components/page/page";
import SmallTeamAttendance from "./analytics/small-team-attendance";

const renderList = (arr: ProfileTabCommonType[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
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
            <Typography sx={{ color: "text.secondary" }}>
              {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
            </Typography>
          </Box>
        </Box>
      );
    });
  } else {
    return null;
  }
};

const generateMemberAbout = (
  member: Member,
  transl: any,
): ProfileTabCommonType[] =>
  [
    member?.full_name && {
      icon: "tabler:user",
      value: member.full_name,
      property: transl("full_name"),
    },
    member?.birth_date && {
      icon: "tabler:calendar",
      value: formatDate(member.birth_date),
      property: transl("birth_date"),
    },
    member?.gender && {
      icon: `tabler:${member.gender == "male" ? "man" : "woman"}`,
      value: member.gender,
      property: transl("gender"),
    },
    member?.nationality && {
      icon: "tabler:flag",
      value: member.nationality,
      property: transl("nationality"),
    },

    // Add more properties as needed
  ].filter(Boolean) as ProfileTabCommonType[];
const generateContactInfo = (
  contact: MemberContact,
  transl: any,
): ProfileTabCommonType[] =>
  [
    contact?.phone && {
      icon: "tabler:phone",
      value: contact.phone,
      property: transl("phone"),
    },
    contact?.email && {
      icon: "tabler:mail",
      value: contact.email,
      property: transl("email"),
    },

    // You can add more properties as needed
  ].filter(Boolean) as ProfileTabCommonType[];
const MemberAboutOverview = ({ member, showSmallTeamAttendance = true }: { member: Member, showSmallTeamAttendance?: boolean }) => {
  const { t: transl } = useTranslation();

  return (
    <Page titleId="member-profile">
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 4,
                    color: "text.disabled",
                    textTransform: "uppercase",
                  }}
                >
                  {transl("about")}
                </Typography>
                {renderList(generateMemberAbout(member, transl))}
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 4,
                    color: "text.disabled",
                    textTransform: "uppercase",
                  }}
                >
                  {transl("contacts")}
                </Typography>
                {renderList(
                  generateContactInfo(
                    member?.primaryContact as MemberContact,
                    transl,
                  ),
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {
          showSmallTeamAttendance &&
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <SmallTeamAttendance memberId={member.id} year={2024} />
              </CardContent>
            </Card>
          </Grid>
        }

      </Grid>
    </Page>
  );
};

export default MemberAboutOverview;
