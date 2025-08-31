import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import useSocialMedia from "src/hooks/member/social-media-hook";
import MemberSocialMediaForm from "./member-social-medias-form";
import MemberSocialMedia from "src/types/member/social-media";
import Member from "src/types/member/member";

interface MemberSocialMediaDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  memberSocialMedia: MemberSocialMedia;
  member: Member;
}

const validationSchema = yup.object().shape({
  link: yup.string().required(),
  social_media_id: yup.string().required(),
  user_name: yup.string().required(),
});

const MemberSocialMediaDrawer = (props: MemberSocialMediaDrawerType) => {
  // ** Props
  const { open, toggle, refetch, member, memberSocialMedia } = props;

  const { allSocialMedias, addNewMemberSocialMedia, updateMemberSocialMedia } =
    useSocialMedia();

  const isEdit = memberSocialMedia?.id ? true : false;
  console.log("is edit", isEdit);

  const getPayload = (values: MemberSocialMedia) => {
    const payload = {
      data: {
        ...values,
        id: memberSocialMedia?.id,
        link: values.link,
        member_id: member.id,
        social_media_id: values.social_media_id,
        user_name: values.user_name,
      },
      files: [],
    };

    return payload;
  };
  const handleClose = () => {
    toggle();

    // formik.resetForm()
  };
  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={
        isEdit ? "edit-meber-social-media" : "create-meber-meber-social-media"
      }
      handleClose={handleClose}
      open={open}
    >
      {() =>
        memberSocialMedia && (
          <FormPageWrapper
            edit={isEdit}
            title="member-social-media"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={memberSocialMedia}
            createActionFunc={
              isEdit ? updateMemberSocialMedia : addNewMemberSocialMedia
            }
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<MemberSocialMedia>) => {
              return (
                <MemberSocialMediaForm
                  socialMedias={allSocialMedias || []}
                  formik={formik}
                  defaultLocaleData={{} as MemberSocialMedia}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default MemberSocialMediaDrawer;
