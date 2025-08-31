import { Box, Typography } from "@mui/material";
import Icon from "src/@core/components/icon";
import ProfessionalStatus from "src/types/member/professional-status";
import RowOptions from "src/views/shared/listing/row-options";
import CustomAvatar from "src/@core/components/mui/avatar";

const ProfessionalStatusCard = ({
  academicInfo,
  onDelete,
  onEdit,
  isReadOnly = false,
}: {
  academicInfo: ProfessionalStatus;
  onDelete: (ProfessionalStatusId: string) => void;
  onEdit: (academicInfo: ProfessionalStatus) => void;
  isReadOnly: boolean;
}) => {
  return (
    <Box
      key={academicInfo.id}
      sx={{
        gap: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:not(:last-of-type)": { mb: 4 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            mr: 4,
            minWidth: 57,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomAvatar
            skin="light"
            sx={{ mr: 4, width: 30, height: 30 }}
            alt=""
          >
            <Icon icon={"tabler:building-arch"} />
          </CustomAvatar>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">{academicInfo.status}</Typography>
          <Typography variant="body2">
            {academicInfo.occupation} in {academicInfo.organization_name}
          </Typography>
        </Box>
      </Box>
      <Box>
        {!isReadOnly && (
          <RowOptions
            item={academicInfo}
            onDelete={() => onDelete(academicInfo.id)}
            onEdit={onEdit}
            editPermissionRule={{
              action: "update",
              subject: "professionalstatus",
            }}
            deletePermissionRule={{
              action: "delete",
              subject: "professionalstatus",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProfessionalStatusCard;
