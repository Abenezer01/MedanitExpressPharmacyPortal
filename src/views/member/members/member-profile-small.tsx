import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import Member from "src/types/member/member";
import Position from "src/types/team/position";
import UserAvatar from "src/views/admin/user/user-avatar";

const MemberProfileSmall = ({
  member,
  position,
  readonly = false,
  route = `/member/members/${member?.id}/general`
}: {
  member: Member;
  position?: Position | string;
  readonly?: boolean;
  route?: string;
}) => {
  const linkComponent = readonly ? "div" : Link;
  const linkProps = readonly
    ? {}
    : { href: route };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <UserAvatar user={member} />
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography
          noWrap
          component={linkComponent}
          {...linkProps}
          sx={{
            fontWeight: 500,
            textDecoration: "none",
            color: "text.secondary",
            "&:hover": { color: "primary.main" },
          }}
        >
          {member?.name}
        </Typography>
        <Typography noWrap variant="body2" sx={{ color: "text.disabled" }}>
          {position && typeof position === 'object' ? position.name : position || "member"}
        </Typography>
      </Box>
    </Box>
  );
};

export default MemberProfileSmall;
