// ** MUI Imports
import Grid from "@mui/material/Grid";
import User from "src/types/admin/user";

// ** Types

// ** Demo Components Imports
import UserViewLeft from "src/views/admin/user/view/UserViewLeft";
import UserViewRight from "./UserViewRight";

type Props = {
  tab: string;
  user: User;
  isLoading: boolean;
};

const UserView = ({ tab, user, isLoading }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft user={user} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight isLoading={isLoading} tab={tab} user={user} />
      </Grid>
    </Grid>
  );
};

export default UserView;
