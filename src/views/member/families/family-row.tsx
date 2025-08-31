import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import { Fragment } from 'react';
import Family from 'src/types/member/family';
import RowOptions from 'src/views/shared/listing/row-options';
import MemberProfileSmall from '../members/member-profile-small';
import { Box } from '@mui/material';

interface CellType {
  row: Family;
}

export const familyColumns = (
  onEdit: (family: Family) => void,
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
        return (
          <Typography
            component={Link}
            href={`/member/families/${row.id}/members`}
            sx={{
              fontWeight: 500,
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {row?.representative?.first_name
              ? `${row.representative.first_name.trim().endsWith('s') ? row.representative.first_name.trim() + "'" : row.representative.first_name.trim() + "'s"} family`
              : ""
            }
          </Typography>
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('representative'),
      field: 'representative',
      renderCell: ({ row }: CellType) => {
        return <Box sx={{ display: "flex", alignItems: "center" }}>
          <MemberProfileSmall member={row?.representative} />
        </Box>
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('Family Count'),
      field: 'members',
      renderCell: ({ row }: CellType) => {
        return <Box sx={{ display: "flex", alignItems: "center" }}>
          {row?.members?.length}
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
              subject: "family",
            }}
            deletePermissionRule={{
              action: "delete",
              subject: "family",
            }}
          />
        </Fragment>
      )
    }
  ] as GridColDef[];
