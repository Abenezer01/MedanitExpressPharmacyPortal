// ** MUI Imports
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Icon from "src/@core/components/icon";
import { useAuth } from "src/hooks/useAuth";
import { timeGreating } from "src/utils/formatter/date";

const Illustration = styled("div")(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: "absolute",
  [theme.breakpoints.down("sm")]: {
    right: 5,
    width: 110,
  },
}));

const DashboardUserStatus = () => {
  const { user } = useAuth();
  const greating = timeGreating(new Date());

  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          {greating.greating}

          {user?.name}
        </Typography>
        <Typography sx={{ mb: 2, color: "text.secondary" }}>&nbsp;</Typography>
        <Typography variant="h4" sx={{ mb: 0.75, color: "primary.main" }}>
          &nbsp;
        </Typography>
        <Button variant="contained">&nbsp;</Button>
        <Illustration>
          {greating.greatingName === "morning" ? (
            <Icon icon="tabler:sun" color="yellow" fontSize={80} />
          ) : greating.greatingName === "afternoon" ? (
            <Icon icon="tabler:sun" color="orange" fontSize={80} />
          ) : (
            <Icon icon="tabler:moon-stars" fontSize={80} />
          )}
        </Illustration>{" "}
      </CardContent>
    </Card>
  );
};

export default DashboardUserStatus;
