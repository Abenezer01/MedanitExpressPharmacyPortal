import { Box, Typography } from "@mui/material";
import Link from "next/link";
import MemberSocialMedia from "src/types/member/social-media";
import { getSocialMediaImageUrl } from "src/utils/genral";
import RowOptions from "src/views/shared/listing/row-options";

const MemberSocialMediaCard = ({
  account,
  onDelete,
  onEdit,
  isReadOnly,
}: {
  account: MemberSocialMedia;
  onDelete: (memberAccountId: string) => void;
  onEdit: (account: MemberSocialMedia) => void;
  isReadOnly: boolean;
}) => {
  return (
    <Box
      key={account.id}
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
          <img
            src={getSocialMediaImageUrl(account.socialmedia.name)}
            alt={account.user_name}
            height="38"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">{account.socialmedia.name}</Typography>

          <Typography
            component="div"
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            <Link
              href={account.link}
              target="_blank"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {account.user_name}
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box>
        {!isReadOnly && (
          <RowOptions
            onDelete={() => onDelete(account.id)}
            onEdit={onEdit}
            item={account}
            options={[]}
          ></RowOptions>
        )}
      </Box>
    </Box>
  );
};

export default MemberSocialMediaCard;
