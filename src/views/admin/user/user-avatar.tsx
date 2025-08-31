import { AvatarProps } from "@mui/material";
import { FC, forwardRef } from "react";
import CustomAvatar from "src/@core/components/mui/avatar";
import { getInitials } from "src/@core/utils/get-initials";
import { availableColors } from "src/configs/app-constants";
import { getProfilePictureURL } from "src/services/utils/file";
import User from "src/types/admin/user";
import Member from "src/types/member/member";

type UserAvatarProps = AvatarProps & {
  user?: User | Member;
  alt?: string;
  photoSrc?: string | null;
};

const UserAvatar: FC<UserAvatarProps> = forwardRef(
  ({ user, alt, photoSrc, ...otherProps }) => {
    return (
      <CustomAvatar
        skin="light"
        alt={alt}
        color={
          availableColors[
            Math.floor(Math.random() * availableColors.length)
          ] as any
        }
        src={photoSrc ? photoSrc : getProfilePictureURL(user?.id)}
        sx={{
          mr: 2.5,
          width: 38,
          height: 38,
          fontWeight: 500,
          fontSize: (theme) => theme.typography.body1.fontSize,
        }}
        {...otherProps}
      >
        {getInitials(user?.name ? user.name : "")}
      </CustomAvatar>
    );
  },
);

export default UserAvatar;
