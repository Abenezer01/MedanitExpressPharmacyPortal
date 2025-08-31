import { Box, Card } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/general/use-paginated-fetch';
import familyMemberApiService from 'src/services/member/family-member-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import Family, { FamilyMember } from 'src/types/member/family';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import FamilyMemberDrawer from './family-member-drawer';
import { familyMemberColumns } from './family-member-row';

function FamilyMemberList({ family }: { family: Family }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FamilyMember | null>(null);
  const { t: transl } = useTranslation();
  const fetchFamilyMembers = (params: GetRequestParam): Promise<IApiResponse<FamilyMember[]>> => {
    return familyMemberApiService.getAll({ ...params, filter: { ...params.filter, family_id: family?.id } });
  };

  const {
    data: familyMembers,
    isLoading,
    pagination,
    handlePageChange,
    handleSearch,
    refetch
  } = usePaginatedFetch<FamilyMember[]>({
    queryKey: ['familyMembers'],
    fetchFunction: fetchFamilyMembers
  });

  const toggleDrawer = () => {
    setSelectedRow({} as FamilyMember);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (family: FamilyMember) => {
    toggleDrawer();
    setSelectedRow(family);
  };
  const handleDelete = async (familyId: string) => {
    await familyMemberApiService.delete(familyId);
    refetch();
  };
  console.log('family ', family)
  return (
    <Box>
      {showDrawer && (
        <FamilyMemberDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          familyMember={selectedRow as FamilyMember}
          familyId={family.id}
          refetch={refetch}
        />
      )}
      <Card>
        <ItemsListing
          type={ITEMS_LISTING_TYPE.table.value}
          // Data configuration
          dataConfig={{
            items: familyMembers || [],
            fetchDataFunction: fetchFamilyMembers,
            isLoading: isLoading
          }}
          // Pagination configuration
          paginationConfig={{
            pagination: pagination,
            onChange: handlePageChange,
          }}
          // Table configuration
          tableConfig={{
            headers: familyMemberColumns(
              handleEdit,
              handleDelete,
              transl
            ),
          }}
          // Header configuration
          headerConfig={{
            title: "familys",
            features: {

              search: {
                enabled: true,
                searchKeys: ["name"],
                onSearch: handleSearch,
                permission: {
                  action: "read",
                  subject: "family",
                }
              },
              export: {
                enabled: true,
                permission: {
                  action: "export",
                  subject: "family",
                }
              }
            }
          }}
          // Action configuration
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            permission: {
              action: "create",
              subject: "family",
            },
          }}
        />
      </Card>
    </Box>
  );
}

export default FamilyMemberList;
