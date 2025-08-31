import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import noticeBoardApiService from "src/services/team/small-team-service";
import { FileWithId } from "src/types/general/file";
import Notice from "src/types/team/notice-board";
import CustomMultiFileSelector from "src/views/shared/form/custom-multiple-files-selector";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface NoticeBoardFormProps {
  formik: FormikProps<Notice>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: any;
  files: FileWithId[];
  onFilesChange: (files: FileWithId[]) => void;
}

const NoticeBoardForm: React.FC<NoticeBoardFormProps> = ({ formik, files, onFilesChange }) => {
  const { t: transl } = useTranslation();
  const { data: noticeBoards, isLoading } = useQuery({
    queryKey: ["small-teams"],
    queryFn: () =>
      noticeBoardApiService.getAll({
        pagination: {
          page: 1,
          pageSize: 100,
        },
      }),
  });
  return (
    <>
      {/* Title */}
      <CustomTextBox
        fullWidth
        label={transl("title")}
        placeholder={transl("title")}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />

      {/* Content */}
      <CustomTextBox
        fullWidth
        label={transl("content")}
        placeholder={transl("content")}
        name="content"
        multiline
        rows={3}
        size="small"
        sx={{ mb: 2 }}
      />

      {/* Recipient Teams */}
      <FormControl fullWidth error={!!formik.errors.recipientsId && !!formik.touched.recipientsId}>
        <InputLabel id="recipient-teams-label">{transl("recipientTeams")}</InputLabel>
        <Select
          labelId="recipient-teams-label"
          id="recipient-teams"
          multiple
          value={formik.values.recipientsId || []}
          onChange={(event) => formik.setFieldValue("recipientsId", event.target.value)}
          input={<OutlinedInput label={transl("recipientsId")} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((teamId) => (
                <Chip key={teamId} label={noticeBoards?.payload?.find((team) => team.id === teamId)?.name || teamId} />
              ))}
            </Box>
          )}
          disabled={isLoading}
        >
          {noticeBoards?.payload?.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
        {formik.errors.recipientsId && formik.touched.recipientsId && (
          <Typography variant="caption" color="error">
            {formik.errors.recipientsId}
          </Typography>
        )}
      </FormControl>

      {/* File Upload */}
      <CustomMultiFileSelector label={transl("common.form.image-upload")} files={files} onFilesChange={onFilesChange} />
    </>
  );
};

export default NoticeBoardForm;
