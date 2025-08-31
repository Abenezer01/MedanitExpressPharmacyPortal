// ** React Imports

// ** MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid, { GridProps } from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles";

// ** Icons Imports

// ** Third Party Imports
import { ApexOptions } from "apexcharts";

// ** Custom Components Imports
import ReactApexcharts from "src/@core/components/react-apexcharts";

// ** Hook Import

// ** Util Import
import { useQuery } from "@tanstack/react-query";
import { hexToRGBA } from "src/@core/utils/hex-to-rgba";
import dashboardApiService from "src/services/dashboard/dashboard-service";
import { defaultGetRequestParam } from "src/types/requests";

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.up("sm")]: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const DashboardAgeBasedAnalysis = () => {
  // ** State

  // ** Hooks & Var
  const theme = useTheme();
  const ageRanges: string[] = [
    "15-19",
    "20-24",
    "25-29",
    "30-34",
    "35-39",
    "40-44",
    "45-49",
    "50-54",
    "60-64",
  ];
  const { data: ageCategoryData } = useQuery({
    queryKey: ["dashboard-age-based-stats"],
    queryFn: () =>
      dashboardApiService
        .getAgeBasedAnalysis({
          ...defaultGetRequestParam,
          filter: { end_age: 5, start_age: 100 },
        })
        .then((response) => {
          return response.payload;
        }),
  });
  const menData = [];
  const womenData = [];
  const data = ageCategoryData?.sortedCategories;
  for (const key in data) {
    const maleCount = data[key]["male"] ? data[key]["male"] : 0;
    const femaleCount = data[key]["female"] ? data[key]["female"] : 0;
    menData.push(maleCount);
    womenData.push(femaleCount); // Negative values for women
  }

  const barSeries = [
    { name: "Men", data: menData },
    { name: "Women", data: womenData },
  ];
  data;

  const barOptions: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      lineCap: "round",
      colors: [theme.palette.background.paper],
    },
    colors: [
      hexToRGBA(theme.palette.primary.main, 1),
      hexToRGBA(theme.palette.secondary.main, 1),
    ],
    legend: {
      offsetY: -5,
      offsetX: -30,
      position: "top",
      fontSize: "13px",
      horizontalAlign: "left",
      fontFamily: theme.typography.fontFamily,
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 4,
        horizontal: 10,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 10,
        offsetY: 1,
        offsetX: theme.direction === "ltr" ? -4 : 5,
      },
    },
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "70%",
        endingShape: "rounded",
        startingShape: "rounded",
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      yaxis: {
        lines: { show: false },
      },
      padding: {
        left: -15,
        right: -10,
        bottom: -12,
      },
    },
    xaxis: {
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false },
      categories: ageRanges,
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string,
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string,
        },
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          chart: { height: 321 },
          plotOptions: {
            bar: { columnWidth: "45%" },
          },
        },
      },
      {
        breakpoint: 1380,
        options: {
          plotOptions: {
            bar: { columnWidth: "55%" },
          },
        },
      },
      {
        breakpoint: 1290,
        options: {
          chart: { height: 421 },
        },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 321 },
          plotOptions: {
            bar: { columnWidth: "40%" },
          },
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: { columnWidth: "50%" },
          },
        },
      },
      {
        breakpoint: 680,
        options: {
          plotOptions: {
            bar: { columnWidth: "60%" },
          },
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: "50%" },
          },
        },
      },
      {
        breakpoint: 450,
        options: {
          plotOptions: {
            bar: { columnWidth: "55%" },
          },
        },
      },
    ],
  };

  return (
    <Card>
      <Grid container>
        <StyledGrid
          item
          xs={12}
          sx={{
            '& .apexcharts-series[rel="1"]': { transform: "translateY(-6px)" },
            '& .apexcharts-series[rel="2"]': { transform: "translateY(-9px)" },
          }}
        >
          <CardHeader title="Members with Age Group" />
          <CardContent>
            <ReactApexcharts
              type="bar"
              height={301}
              series={barSeries}
              options={barOptions}
            />
          </CardContent>
        </StyledGrid>
      </Grid>
    </Card>
  );
};

export default DashboardAgeBasedAnalysis;
