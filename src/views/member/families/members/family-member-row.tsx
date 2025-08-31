import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { FamilyMember } from 'src/types/member/family';
import RowOptions from 'src/views/shared/listing/row-options';
import MemberProfileSmall from '../../members/member-profile-small';

interface CellType {
  row: FamilyMember;
}

export const familyMemberColumns = (
  onEdit: (familyMember: FamilyMember) => void,
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
          <MemberProfileSmall member={row?.member} />
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('family_role'),
      field: 'family_role',
      renderCell: ({ row }: CellType) => {
        return (
          row.family_role
        );
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
              subject: "familymember",
            }}
            deletePermissionRule={{
              action: "delete",
              subject: "familymember",
            }}
          />
        </Fragment>
      )
    }
  ] as GridColDef[];
