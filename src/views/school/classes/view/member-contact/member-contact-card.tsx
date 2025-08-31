import { Box, Card, Typography } from "@mui/material";
import MemberContact from "src/types/member/contact";
import RowOptions from "src/views/shared/listing/row-options";
import CustomAvatar from "src/@core/components/mui/avatar";
import Icon from "src/@core/components/icon";

const MemberContactCard = ({
  contact,
  onDelete,
  onEdit,
  isReadOnly = false,
}: {
  contact: MemberContact;
  onDelete: (memberContactId: string) => void;
  onEdit: (contact: MemberContact) => void;
  isReadOnly: boolean;
}) => {
  const handleEmailClick = (email: string) => {
    const subject = ""; // replace with the subject, URL-encoded
    const body = ""; // replace with the body, URL-encoded

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;
  };

  return (
    <Card
      key={contact.id}
      sx={{
        gap: 2,
        display: "flex",
        alignItems: "center",
        padding: 3,
        justifyContent: "space-between",
        "&:not(:last-of-type)": { mb: 2 },
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
          <CustomAvatar skin="light" sx={{ mr: 4, width: 30, height: 30 }}>
            <Icon
              icon={`tabler:${contact.type === "home"
                ? "device-landline-phone"
                : contact.type === "personal"
                  ? "device-mobile"
                  : "device-landline-phone"
                }`}
            />
          </CustomAvatar>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{contact.phone} </Typography>
            {contact.is_primary && (
              <CustomAvatar skin="light" sx={{ ml: 1, width: 20, height: 20 }}>
                {" "}
                <Icon icon={"tabler:circle-check-filled"} />
              </CustomAvatar>
            )}
          </Box>
          <Typography
            onClick={() => handleEmailClick(contact.email)}
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            {contact.email}
          </Typography>
        </Box>
      </Box>
      <Box>
        {!isReadOnly && (
          <RowOptions
            item={contact}
            onDelete={() => onDelete(contact.id)}
            onEdit={onEdit}
            editPermissionRule={{
              action: "update",
              subject: "membercontact",
            }}
            deletePermissionRule={{
              action: "delete",
              subject: "membercontact",
            }}
          />
        )}
      </Box>
    </Card>
  );
};

export default MemberContactCard;
