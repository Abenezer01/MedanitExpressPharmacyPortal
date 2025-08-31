import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import Child from 'src/types/child/child';
import MemberProfileSmall from 'src/views/member/members/member-profile-small';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Child;
}

export const childColumns = (
  onEdit: (child: Child) => void,
  onDelete: (id: string) => void,
  t: any,
) =>
  [

    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('name'),
      field: 'name',
      renderCell: ({ row }: CellType) => {
        return <Box sx={{ display: "flex", alignItems: "center" }}>
          <MemberProfileSmall member={row?.member} route={`/child/children/${row?.id}/about`} />
        </Box>
      }
    },


    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t("actions"),
      renderCell: ({ row }: CellType) => (
        <Fragment>

          <RowOptions onEdit={onEdit} onDelete={() => onDelete(row.id)} item={row} options={[]}
            editPermissionRule={{
              action: "update",
              subject: "child",
            }}
            deletePermissionRule={{
              action: "delete",
              subject: "child",
            }}
          />
        </Fragment>
      )
    }
  ] as GridColDef[];
