// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Types
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";
import { useQuery } from "@tanstack/react-query";
import { defaultGetRequestParam } from "src/types/requests";
import dashboardApiService from "src/services/dashboard/dashboard-service";

interface DataType {
  icon: string;
  stats: string;
  title: string;
  color: ThemeColor;
}
interface GeneralStatistics {
  departments: number;
  positions: number;
  members: {
    total: number;
    males: number;
    females: number;
  };
  smallTeams: number;
}

const renderStats = (data: GeneralStatistics) => {
  const generalStatsData: DataType[] = [
    {
      stats: data?.departments.toString(),
      title: "Department",
      color: "primary",
      icon: "tabler:components",
    },
    {
      stats: data?.members.total.toString(),
      title: "Users",
      color: "info",
      icon: "tabler:users",
    },
    {
      stats: (data?.members.males + data?.members.females).toString(),
      title: "Members",
      color: "error",
      icon: "tabler:users",
    },
    {
      stats: data?.smallTeams.toString(),
      title: "Small Teams",
      color: "success",
      icon: "tabler:users-group",
    },
  ];

  return generalStatsData.map((sale: DataType, index: number) => (
    <Grid item xs={6} md={3} key={index}>
      <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
        <CustomAvatar
          skin="light"
          color={sale.color}
          sx={{ mr: 4, width: 42, height: 42 }}
        >
          <Icon icon={sale.icon} fontSize="1.5rem" />
        </CustomAvatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">{sale.stats}</Typography>
          <Typography variant="body2">{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const GeneralStatistics = () => {
  const { data } = useQuery({
    queryKey: ["dashboard-general-stats"],
    queryFn: () =>
      dashboardApiService
        .getGeneralStats({ ...defaultGetRequestParam })
        .then((response) => {
          return response.payload;
        }),
  });

  return (
    <Card>
      <CardHeader
        title="Statistics"
        sx={{ "& .MuiCardHeader-action": { m: 0, alignSelf: "center" } }}
        action={
          <Typography variant="body2" sx={{ color: "text.disabled" }}>
            Updated 1 month ago
          </Typography>
        }
      />
      <CardContent
        sx={{
          pt: (theme) => `${theme.spacing(7)} !important`,
          pb: (theme) => `${theme.spacing(7.5)} !important`,
        }}
      >
        <Grid container spacing={6}>
          {renderStats(data as GeneralStatistics)}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GeneralStatistics;
