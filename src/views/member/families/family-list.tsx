import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import familyApiService from "src/services/member/family-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import Family from "src/types/member/family";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import { familyColumns } from "./family-row";
import FamilyDrawer from "./family-drawer";

const FamilyList = ({ }) => {
  const [familyDrawerOpen, setAddFamilyOpen] = useState<boolean>(false);
  const [editableFamily, setEditableFamily] = useState<Family>();
  const { t: transl } = useTranslation();

  const handleEdit = (family: Family) => {
    toggleFamilyDrawer();
    setEditableFamily(family);
  };

  // Access the hook methods and state
  const fetchFamilies = (
    params: GetRequestParam
  ): Promise<IApiResponse<Family[]>> => {
    return familyApiService.getAll({ ...params });
  };

  const {
    data: families,
    isLoading,
    pagination,
    handlePageChange,
    handleSearch,
    refetch,
  } = usePaginatedFetch<Family[]>({
    queryKey: ["families"],
    fetchFunction: fetchFamilies,
  });



  const toggleFamilyDrawer = () => {
    setEditableFamily({} as Family);
    setAddFamilyOpen(!familyDrawerOpen);
  };
  const handleDelete = async (familyId: string) => {
    await familyApiService.delete(familyId);
    refetch();
  };

  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        // Data configuration
        dataConfig={{
          items: families || [],
          fetchDataFunction: fetchFamilies,
          isLoading: isLoading
        }}
        // Pagination configuration
        paginationConfig={{
          pagination: pagination,
          onChange: handlePageChange,
        }}
        // Table configuration
        tableConfig={{
          headers: familyColumns(
            handleEdit,
            handleDelete,
            transl
          ),
        }}
        // Header configuration
        headerConfig={{
          title: "families",
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
          onClick: toggleFamilyDrawer,
          permission: {
            action: "create",
            subject: "family",
          },
        }}
      />

      {familyDrawerOpen && (
        <FamilyDrawer
          refetch={refetch}
          open={familyDrawerOpen}
          toggle={toggleFamilyDrawer}
          family={editableFamily as Family}
        />
      )}
    </>
  );
};
FamilyList.acl = {
  action: "read",
  subject: "family",
};
export default FamilyList;
