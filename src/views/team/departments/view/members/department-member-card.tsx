import { Box, Card } from "@mui/material";
import Icon from "src/@core/components/icon";
import CustomAvatar from "src/@core/components/mui/avatar";
import TeamMember from "src/types/team/team-member";
import MemberProfileSmall from "src/views/member/members/member-profile-small";
import RowOptions from "src/views/shared/listing/row-options";

const DepartmentMemberCard = ({
  departmentMember,
  onEdit,
  onDelete,
}: {
  departmentMember: TeamMember;
  onEdit: (departmentMember: TeamMember) => void;
  onDelete: (departmentMemberId: string) => void;
}) => {
  return (
    <Card
      sx={{
        gap: 2,
        padding: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <MemberProfileSmall
        member={departmentMember.member}
        position={departmentMember.position}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {departmentMember.is_leader && (
          <CustomAvatar
            skin="light"
            color={"primary"}
            sx={{ width: 20, height: 20, mr: 2 }}
          >
            <Icon icon={"tabler:star-filled"} />
          </CustomAvatar>
        )}
        <RowOptions
          onEdit={onEdit}
          editPermissionRule={{
            action: "",
            subject: "position",
          }}
          deletePermissionRule={{
            action: "delete",
            subject: "position",
          }}
          onDelete={() => onDelete(departmentMember.id)}
          item={departmentMember}
          options={[]}
        />
      </Box>
    </Card>
  );
};
export default DepartmentMemberCard;
