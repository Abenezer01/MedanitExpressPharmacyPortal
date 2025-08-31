import React from 'react';
import { Box, Button, FormControl, FormLabel, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { FileWithId } from 'src/types/general/file';

interface CustomMultiFileSelectorProps {
  label: string;
  files: FileWithId[];
  onFilesChange: (files: FileWithId[]) => void;
}

const CustomMultiFileSelector: React.FC<CustomMultiFileSelectorProps> = ({ label, files, onFilesChange }) => {
  const { t } = useTranslation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles: FileWithId[] = Array.from(event.target.files).map((file,index) => ({
        id: `temp_${Date.now()}_${index}`,
        file
      }));
      onFilesChange([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (id: string) => {
    const newFiles = files.filter((file) => file.id !== id);
    onFilesChange(newFiles);
  };

  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
      <FormLabel component="legend">{t(label)}</FormLabel>
      {files.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
          {files.map((file) => (
            <Box key={file.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon="mdi:file-document-outline" color="#ffcc00" width={25} height={25} />
              <Typography variant="body1">{file.file.name}</Typography>
              <IconButton onClick={() => handleRemoveFile(file.id)}>
                <Icon icon="tabler:trash" width={20} height={20} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
      <Button variant="outlined" component="label" size="large" color="secondary">
        <Icon icon="tabler:paperclip" width={20} height={20} /> {t('Upload File')}
        <input type="file" multiple hidden onChange={handleFileChange} />
      </Button>
    </FormControl>
  );
};

export default CustomMultiFileSelector;