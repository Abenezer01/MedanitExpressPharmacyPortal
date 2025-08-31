export const getSocialMediaImageUrl = (title: string) => {
  return `/images/logos/${String(title).toLowerCase()}.png`;
};
