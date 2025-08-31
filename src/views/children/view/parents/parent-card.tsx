import { Box, Card, Typography } from "@mui/material";
import RowOptions from "src/views/shared/listing/row-options";
import CustomAvatar from "src/@core/components/mui/avatar";
import Parent from "src/types/child/parent";
import MemberProfileSmall from "src/views/member/members/member-profile-small";
import Member from "src/types/member/member";
import { Fragment } from "react";

const ParentCard = ({
  parent,
  onDelete,
  onEdit,
  isReadOnly = false,
}: {
  parent: Parent;
  onDelete: (parentId: string) => void;
  onEdit: (parent: Parent) => void;
  isReadOnly: boolean;
}) => {
  const handleEmailClick = (email: string) => {
    const subject = ""; // Replace with the subject, URL-encoded
    const body = ""; // Replace with the body, URL-encoded

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;
  };

  return (
    <Card
      key={parent.id}
      sx={{
        gap: 1,
        display: "flex",
        alignItems: "center",
        padding: 3,
        justifyContent: "space-between",
        "&:not(:last-of-type)": { mb: 2 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {parent.member ? (
          // Render for parent with member
          <Box
            sx={{
              mr: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MemberProfileSmall
              member={parent.member as Member}
              position={parent.relationship}
            />
          </Box>
        ) : (
          // Render for parent without member
          <Fragment>
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
                color="secondary"
                sx={{ width: 57, height: 57 }}
              >
                {parent.name.charAt(0).toUpperCase()}
              </CustomAvatar>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6">{parent.name}</Typography>

              {parent.email && (
                <Typography
                  onClick={() => handleEmailClick(parent.email)}
                  sx={{ color: "primary.main", textDecoration: "none", cursor: "pointer" }}
                >
                  {parent.email}
                </Typography>
              )}

              {parent.phone && (
                <Typography sx={{ color: "text.secondary" }}>
                  {parent.phone}
                </Typography>
              )}

              {parent.relationship && (
                <Typography sx={{ color: "text.secondary" }}>
                  {parent.relationship}
                </Typography>
              )}
            </Box>
          </Fragment>
        )}

      </Box>

      <Box>
        {!isReadOnly && (
          <RowOptions
            item={parent}
            onDelete={() => onDelete(parent.id)}
            onEdit={() => onEdit(parent)}
            editPermissionRule={{
              action: "update",
              subject: "parent",
            }}
            deletePermissionRule={{
              action: "delete",
              subject: "parent",
            }}
          />
        )}
      </Box>
    </Card>
  );
};

export default ParentCard;
