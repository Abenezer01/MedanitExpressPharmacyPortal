import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import User from "src/types/admin/user";
import UserAvatar from "./user-avatar";

const UserProfileSmall = ({ user }: { user: User }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <UserAvatar user={user} />

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography
          noWrap
          component={Link}
          href={`/admin/users/${user.id}/account`}
          sx={{
            fontWeight: 500,
            textDecoration: "none",
            color: "text.secondary",
            "&:hover": { color: "primary.main" },
          }}
        >
          {user.name}
        </Typography>
        <Typography noWrap variant="body2" sx={{ color: "text.disabled" }}>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfileSmall;
