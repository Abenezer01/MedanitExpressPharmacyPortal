import { Box, Typography } from "@mui/material";
import Icon from "src/@core/components/icon";
import CustomAvatar from "src/@core/components/mui/avatar";
import AcademicInformation from "src/types/member/academic-information";
import { formatDate } from "src/utils/formatter/date";
import RowOptions from "src/views/shared/listing/row-options";

const AcademicInformationCard = ({
  academicInfo,
  onDelete,
  onEdit,
  isReadOnly = false,
}: {
  academicInfo: AcademicInformation;
  onDelete: (AcademicInformationId: string) => void;
  onEdit: (academicInfo: AcademicInformation) => void;
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
          <Typography variant="h6">{academicInfo.institution}</Typography>
          <Typography variant="body2">
            {academicInfo.level} in {academicInfo.type}
          </Typography>

          <Typography
            sx={{ color: "primary.main", textDecoration: "none" }}
            variant={"caption"}
          >
            {formatDate(academicInfo.started_year)} -{" "}
            {formatDate(academicInfo.completed_year)}
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
              subject: "acadamicinformation",
            }}
            deletePermissionRule={{
              action: "delete",
              subject: "acadamicinformation",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default AcademicInformationCard;
