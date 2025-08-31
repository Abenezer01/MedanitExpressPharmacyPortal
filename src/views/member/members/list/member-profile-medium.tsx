import { Box, Button } from "@mui/material";
import Member from "src/types/member/member";
import MemberProfileSmall from "../member-profile-small";
import Icon from "src/@core/components/icon";

const MemberProfileMedium = ({
  member,
  onEdit,
  onDelete,
}: {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (memberId: string) => void;
}) => {
  return (
    <Box
      sx={{
        gap: 2,
        px: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:not(:last-of-type)": { mb: 4 },
      }}
    >
      <MemberProfileSmall member={member} />
      <Box>
        <Button
          variant="tonal"
          sx={{ p: 2, minWidth: 38, mr: 2 }}
          color={"secondary"}
          onClick={() => onEdit(member)}
        >
          <Icon icon={"tabler:edit"} />
        </Button>{" "}
        <Button
          variant="tonal"
          sx={{ p: 2, minWidth: 38 }}
          color={"error"}
          onClick={() => onDelete(member.id)}
        >
          <Icon icon={"tabler:trash"} />
        </Button>
      </Box>
    </Box>
  );
};
export default MemberProfileMedium;
