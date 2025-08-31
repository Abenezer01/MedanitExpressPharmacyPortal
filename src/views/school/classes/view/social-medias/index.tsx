import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "src/@core/components/icon";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import useSocialMedia from "src/hooks/member/social-media-hook";
import Member from "src/types/member/member";
import MemberSocialMedia from "src/types/member/social-media";
import Page from "src/views/components/page/page";
import ItemsListing from "src/views/shared/listing";
import MemberSocialMediaDrawer from "./member-social-media-drawer";
import MemberSocialMediaCard from "./social-media-card";
import Can from "src/layouts/components/acl/Can";

const SocialMedias = ({
  member,
  isReadOnly = false,
}: {
  member: Member;
  isReadOnly?: boolean;
}) => {
  const { useGetMemberSocialMedia, deleteMemberSocialMedia } = useSocialMedia();
  const { memberSocialMedias, isLoading, refetch } = useGetMemberSocialMedia(
    member.id,
  );

  return (
    <SocialMediaView
      socialMedias={memberSocialMedias}
      onDelete={deleteMemberSocialMedia}
      refetch={refetch}
      isLoading={isLoading}
      member={member}
      isReadOnly={isReadOnly}
    />
  );
};
const SocialMediaView = ({
  socialMedias,
  refetch,
  isLoading,
  onDelete,
  member,
  isReadOnly,
}: {
  socialMedias: MemberSocialMedia[];
  refetch: () => void;
  isLoading: boolean;
  member: Member;
  onDelete: (memberSocialMediaId: string) => void;
  isReadOnly: boolean;
}) => {
  const { t: transl } = useTranslation();

  const [memberSocialMediaDrawerOpen, setAddMemberSocialMediaOpen] =
    useState<boolean>(false);
  const [editableMemberSocialMedia, setEditableMemberSocialMedia] =
    useState<MemberSocialMedia>();
  const handleEdit = (memberSocialMedia: MemberSocialMedia) => {
    toggleMemberSocialMediaDrawer();
    setEditableMemberSocialMedia(memberSocialMedia);
  };

  // Access the hook methods and state

  const toggleMemberSocialMediaDrawer = () => {
    setEditableMemberSocialMedia({} as MemberSocialMedia);
    setAddMemberSocialMediaOpen(!memberSocialMediaDrawerOpen);
  };

  return (
    <Page title="member-social-media">
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Social Accounts" sx={{ pb: 1.5 }} />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                cursor: "pointer",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  color: "text.disabled",
                  textTransform: "uppercase",
                }}
              >
                {transl("member-social-medias")}
              </Typography>
              {!isReadOnly && (
                <Can do={"create"} on={"membersocialmedia"}>
                  <IconButton onClick={toggleMemberSocialMediaDrawer}>
                    <Icon icon="tabler:plus" fontSize={20} />
                  </IconButton>
                </Can>
              )}
            </Box>

            <ItemsListing
              dataConfig={
                {
                  items: socialMedias,
                  isLoading: isLoading,
                }
              }
              headerConfig={
                {
                  title: "member-social-medias",
                }
              }
              type={ITEMS_LISTING_TYPE.list.value}
              createActionConfig={{
                onClick: toggleMemberSocialMediaDrawer,
                onlyIcon: true,
                permission: {
                  action: "create",
                  subject: "membersocialmedia",
                },
              }}

              ItemViewComponent={(props) => (
                <MemberSocialMediaCard
                  isReadOnly={isReadOnly}
                  account={props.data}
                  {...props}
                  onDelete={onDelete}
                  onEdit={handleEdit}
                />
              )}
              hasListHeader={false}
            />
            {memberSocialMediaDrawerOpen && (
              <MemberSocialMediaDrawer
                member={member}
                refetch={refetch}
                open={memberSocialMediaDrawerOpen}
                toggle={toggleMemberSocialMediaDrawer}
                memberSocialMedia={
                  editableMemberSocialMedia as MemberSocialMedia
                }
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Page>
  );
};

export default SocialMedias;
