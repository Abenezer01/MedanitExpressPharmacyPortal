type MemberSocialMedia = {
  id: string;
  link: string;
  member_id: string;
  social_media_id: string;
  is_primary: boolean;
  user_name: string;
  socialmedia: SocialMedia;
};
export type SocialMedia = {
  id: string;
  name: string;
  link: string;
};
export default MemberSocialMedia;
