export const getProfilePictureURL = (user_id: string | undefined) =>
  `${process.env.NEXT_PUBLIC_BASE_API_URL}/generics/files/${user_id}/profile_picture`;
