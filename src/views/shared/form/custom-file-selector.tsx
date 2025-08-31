import React from 'react';
import { Box, Button, FormControl, FormLabel, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

interface CustomFileUploadProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({ label, file, onFileChange }) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
      <FormLabel component="legend">{t(label)}</FormLabel>
      {file && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
          <Icon icon="mdi:file-document-outline" color="#ffcc00" width={25} height={25} />
          <Typography variant="body1">{file.name}</Typography>
          <Icon icon="tabler:trash" color="#f33" width={20} height={20} style={{ cursor: 'pointer' }} onClick={() => onFileChange(null)} />
        </Box>
      )}
      <Button variant="outlined" component="label" size="large" color="secondary">
        <Icon icon="tabler:paperclip" width={20} height={20} /> {t('Upload File')}
        <input
          type="file"
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onFileChange(e.target.files[0]);
            }
          }}
        />
      </Button>
    </FormControl>
  );
};

export default CustomFileUpload;