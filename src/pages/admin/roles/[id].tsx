import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import CardStatsHorizontal from "src/@core/components/card-statistics/card-stats-horizontal";
import { gridSpacing } from "src/configs/app-constants";
import useRole from "src/hooks/admin/role-hook";
import User from "src/types/admin/user";
import AssignPermissionComponent from "src/views/admin/roles/assign-permission/module-form";

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const Pos = styled(Typography)(({ theme }) => ({
  marginBottom: 12,
  color: theme.palette.text.secondary,
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: theme.spacing(2),
}));

const RoleDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { useGetOneRole } = useRole();
  const { data: role, isLoading, error } = useGetOneRole(String(id));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error loading role details
      </Typography>
    );
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Role Details
        </Typography>
      </Grid>

      <Grid item xs={12} md={4}>
        <StyledCard>
          <CardHeader title="Role Information" />
          <CardContent>
            <Title gutterBottom>Name</Title>
            <Typography variant="h5" component="h2">
              {role?.name}
            </Typography>
            <Pos>Description</Pos>
            <Typography variant="body2" component="p">
              {role?.description}
            </Typography>
          </CardContent>
        </StyledCard>
        <Grid container spacing={gridSpacing}>
          <Grid item md={6}>
            <CardStatsHorizontal
              icon="users"
              stats={role?.totalUsers || 0}
              title="Total Users"
            />
          </Grid>
          <Grid item md={6}>
            {" "}
            <CardStatsHorizontal
              icon="permissions"
              stats={role?.totalPermissions || 0}
              title="Total Permissions"
            />
          </Grid>
        </Grid>

        <ActionButtons>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`/edit-role/${id}`)}
          >
            Edit Role
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "1rem" }}
            onClick={() => handleDeleteRole(String(id))}
          >
            Delete Role
          </Button>
        </ActionButtons>
      </Grid>

      <Grid item xs={12} md={8}>
        <StyledCard>
          <CardHeader title="Permissions" />
          <AssignPermissionComponent roleId={String(id)} />
        </StyledCard>

        <StyledCard>
          <CardHeader title="Users with this Role" />
          <CardContent>
            {role?.users?.map((user: User) => (
              <Typography variant="body2" component="p" key={user.id}>
                {user.name} ({user.email})
              </Typography>
            ))}
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );

  function handleDeleteRole(roleId: string) {
    console.log("Deleting role with id:", roleId);
  }
};
RoleDetail.acl = {
  action: "read",
  subject: "role",
};
export default RoleDetail;
