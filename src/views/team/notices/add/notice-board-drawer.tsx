import { FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import noticeBoardApiService from 'src/services/team/notice-board-service';
import { deleteFile, useGetMultipleFiles, uploadFile } from 'src/services/utils/file';
import { FileWithId } from 'src/types/general/file';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import NoticeBoard from 'src/types/team/notice-board';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import NoticeBoardForm from './notice-board-form';

interface NoticeBoardDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  noticeboard: NoticeBoard;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required()
});

const NoticeBoardDrawer: React.FC<NoticeBoardDrawerType> = (props) => {
  const { open, toggle, refetch, noticeboard } = props;

  const { data: fetchedImages } = useGetMultipleFiles({ filter: { fileable_id: noticeboard?.id || '' } });
  const [uploadableFiles, setUploadableFiles] = useState<FileWithId[]>([]);
  const [fetchedImageIds, setFetchedImageIds] = useState<string[]>([]);

  const isEdit = noticeboard?.id ? true : false;

  const createNoticeBoard = async (body: IApiPayload<NoticeBoard>) => {
    return await noticeBoardApiService.create(body);
  };

  const editNoticeBoard = async (body: IApiPayload<NoticeBoard>) => {
    return await noticeBoardApiService.update(noticeboard?.id || '', body);
  };

  useEffect(() => {
    const fetchAndConvertImages = async () => {
      if (fetchedImages) {
        const fetchedFiles = fetchedImages.payload.map(async (image) => {
          const response = await fetch(image.file_url);
          const blob = await response.blob();
          return { id: image.id, file: new File([blob], image.file_name || 'image', { type: blob.type }), isFetched: true };
        });
        const convertedFiles = await Promise.all(fetchedFiles);
        setUploadableFiles(convertedFiles);
        setFetchedImageIds(fetchedImages.payload.map((image) => image.id));
      }
    };

    if (open) {
      fetchAndConvertImages();
    }
  }, [fetchedImages, open]);

  const onFilesChange = (files: FileWithId[] | null) => {
    if (files) {
      setUploadableFiles(files);
    }
  };

  const getPayload = (values: NoticeBoard) => {

    return {
      data: {
        ...values,
        id: noticeboard?.id,
        recepientsId: values.recipientsId || []
      },
      files: []
    };
  }
  const handleClose = () => {
    toggle();
    setUploadableFiles([]);
  };

  const onActionSuccess = async (response: IApiResponse<NoticeBoard>, payload: IApiPayload<NoticeBoard>) => {
    await noticeBoardApiService.updateNoticeboardRecipients({
      data: { notice_board_id: response.payload.id, recipientsIds: payload.data.recipientsId },
      files: []
    })
    const uploadableFilesToUpload = uploadableFiles.filter((file) => !file.isFetched);
    const uploadPromises = uploadableFilesToUpload.map((file) => uploadFile({
      file: file.file,
      type: "NOTICEBOARD_BOARD_ATTACHMENT",
      fileable_id: response.id,
      fileable_type: "noticeboardboard",
      file_description: "",
    }));
    await Promise.all(uploadPromises);
    const uploadableFileIds = uploadableFiles.map((file) => file.id);
    const idsToRemove = fetchedImageIds.filter((id) => !uploadableFileIds.includes(id));

    const removePromises = idsToRemove.map((id) => deleteFile(id));
    await Promise.all(removePromises);
    payload;
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`${isEdit ? 'edit-noticeboard' : 'create-noticeboard'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="noticeboard"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...noticeboard, recipientsId: noticeboard.recipients?.map(recipient => recipient.id) } as NoticeBoard}
          createActionFunc={isEdit ? editNoticeBoard : createNoticeBoard}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<NoticeBoard>) => {
            return (
              <NoticeBoardForm
                files={uploadableFiles}
                onFilesChange={onFilesChange}
                formik={formik}
                defaultLocaleData={{} as NoticeBoard}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default NoticeBoardDrawer;
