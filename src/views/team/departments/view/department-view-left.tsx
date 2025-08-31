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
import CustomAvatar from "src/@core/components/mui/avatar";
import { getInitials } from "src/@core/utils/get-initials";
import { availableColors } from "src/configs/app-constants";
import Department from "src/types/team/department";

const DepartmentViewLeft = ({ department }: { department: Department }) => {
  if (department) {
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
              <CustomAvatar
                skin="light"
                color={
                  availableColors[
                    Math.floor(Math.random() * availableColors.length)
                  ] as any
                }
                sx={{
                  mr: 2.5,
                  width: 100,
                  height: 100,
                  fontWeight: 500,
                  fontSize: (theme) => theme.typography.h2.fontSize,
                }}
              >
                {getInitials(department.name)}
              </CustomAvatar>
              <Typography variant="h4" sx={{ mb: 3 }}>
                {department.name}
              </Typography>
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
                    Description:
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      textTransform: "capitalize",
                    }}
                  >
                    {department.description}
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

export default DepartmentViewLeft;
