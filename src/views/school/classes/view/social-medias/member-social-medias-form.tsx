import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import MemberSocialMedia, { SocialMedia } from "src/types/member/social-media";
import CustomSelect from "src/views/shared/form/custom-select";
import { useEffect } from "react";

interface MemberSocialMediaFormProps {
  formik: FormikProps<MemberSocialMedia>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: MemberSocialMedia;
  socialMedias: SocialMedia[];
}

const MemberSocialMediaForm: React.FC<MemberSocialMediaFormProps> = ({
  formik,
  socialMedias,
}) => {
  const { t: transl } = useTranslation();
  useEffect(() => {
    const selectedSocialMedia = socialMedias?.find(
      (socialMedia) => socialMedia.id === formik.values.social_media_id,
    );
    const link = `${selectedSocialMedia?.link}${formik.values.user_name}`;
    formik.setFieldValue("link", link);
  }, [formik.values.social_media_id, formik.values.user_name]);

  return (
    <>
      <CustomSelect
        name="social_media_id"
        label="Type"
        sx={{ mb: 2 }}
        options={
          socialMedias?.map((socialMedia) => ({
            value: socialMedia.id,
            label: socialMedia.name,
          })) || []
        }

      // other props as needed
      />
      <CustomTextBox
        fullWidth
        label={transl("user-name")}
        placeholder={transl("user_name")}
        name="user_name"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl("link")}
        placeholder={transl("link")}
        name="link"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default MemberSocialMediaForm;
