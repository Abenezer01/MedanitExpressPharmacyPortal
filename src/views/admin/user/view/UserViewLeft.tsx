// ** React Imports

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// ** Icon Imports

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip";

// ** Types

// ** Utils Import
import User from "src/types/admin/user";
import UserAvatar from "../user-avatar";

const UserViewLeft = ({ user }: { user: User }) => {
  // ** States
  if (user) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 13.5,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {user.avatar ? (
                <UserAvatar
                  variant="rounded"
                  sx={{ width: 200, height: 200, mb: 4, fontSize: "3rem" }}
                  user={user}
                />
              ) : (
                <UserAvatar
                  variant="rounded"
                  sx={{ width: 100, height: 100, mb: 4, fontSize: "3rem" }}
                  user={user}
                />
              )}
              <Typography variant="h4" sx={{ mb: 3 }}>
                {user.name}
              </Typography>
              <CustomChip
                rounded
                skin="light"
                size="small"
                label={user.roles ? user.roles[0]?.name : ""}
                sx={{ textTransform: "capitalize" }}
              />
            </CardContent>

            <Divider sx={{ my: "0 !important", mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.disabled", textTransform: "uppercase" }}
              >
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Email:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {user.email}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Role:
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      textTransform: "capitalize",
                    }}
                  >
                    {user.roles ? user.roles[0]?.name : ""}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, color: "text.secondary" }}
                  >
                    Contact:
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    +1 {user.phone}
                  </Typography>
                </Box>

              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewLeft;
