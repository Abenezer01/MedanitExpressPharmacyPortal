import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// Custom Components (assuming they exist)
import CustomAvatar from "src/@core/components/mui/avatar";
import { getInitials } from "src/@core/utils/get-initials";
import MemberProfileSmall from "src/views/member/members/member-profile-small";

interface SmallTeam {
  name: string;
  leader: any; // Update to match your member object structure
  subleader: any; // Update to match your member object structure
}

const SmallTeamViewLeft = ({ smallTeam }: { smallTeam: SmallTeam }) => {

  const theme = useTheme();

  // const avatarColor = theme.palette.primary.main; // Use primary color by default

  // Consider a more deterministic color assignment (optional)
  // if (availableColors && availableColors.length) {
  //   avatarColor = availableColors[Math.floor(Math.random() * availableColors.length)];
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card
          sx={{
            boxShadow: 3,
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper, // Use theme background
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              p: 6, // Consistent padding 
            }}
          >
            {/* Avatar */}
            <CustomAvatar
              skin="light"
              sx={{
                width: 100,
                height: 100,
                fontWeight: 500,
                fontSize: theme.typography.h2.fontSize,
                boxShadow: 4,
              }}
            >
              {getInitials(smallTeam?.name)}
            </CustomAvatar>

            {/* Team Name */}
            <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center", fontWeight: "bold" }}>
              {smallTeam?.name}
            </Typography>

            {/* Divider */}
            <Divider sx={{ my: 3, width: "50%", opacity: 0.8 }} />

            {/* Leader & Sub-leader */}
            <Box sx={{ textAlign: "center", fontSize: theme.typography.body1.fontSize }}>

              <Box sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                  <strong>Leader:</strong>
                </Typography>
                <MemberProfileSmall member={smallTeam?.leader} />
              </Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                  <strong>Sub-Leader:</strong>
                </Typography>
                <MemberProfileSmall member={smallTeam?.subleader} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SmallTeamViewLeft;