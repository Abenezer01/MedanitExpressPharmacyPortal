import { Icon } from '@iconify/react';
import { CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMultipleFiles } from 'src/services/utils/file';
import FileDetail from './file-detail';

function FileDrawer({ id, type, onRefetch }: { id: string; type: string; onRefetch?: (refetch: () => void) => void }) {
  const [show, setShow] = useState(false);
  const { data, isLoading, refetch, isFetching } = useGetMultipleFiles({ filter: { fileable_type:type, fileable_id: id } })
  const { t } = useTranslation();

  // If `onRefetch` prop is provided, pass the refetch function to the parent component
  if (onRefetch) {
    onRefetch(refetch);
  }

  return (
    <Fragment>
      {data?.payload && data?.payload?.length > 0 && (
        <FileDetail show={show} toggleDrawer={() => setShow(!show)} data={data?.payload} refetch={refetch} dataLoading={isLoading} />
      )}
      {isLoading ? (
        <CircularProgress size={10} />
      ) : (
        <Typography
          variant="body1"
          color="primary"
          sx={{
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => setShow(!show)}
        >
          <Icon icon="mdi:file-document-outline" fontSize="1.2rem" />
          {data?.payload?.length || 0} {t('Files')}
          <Tooltip title={t('Refresh Files')}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                refetch();
              }}
              disabled={isFetching}
            >
              <Icon icon="mdi:refresh" />
            </IconButton>
          </Tooltip>
        </Typography>
      )}
    </Fragment>
  );
}

export default FileDrawer;
