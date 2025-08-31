import { useState } from "react";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import familySupportTypeApiService from "src/services/school/family-support-types-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { FamilySupportType } from "src/types/school/family-support";
import ItemsListing from "src/views/shared/listing";
import { familySupportTypeColumns } from "./family-support-type-column";
import { useTranslation } from "react-i18next";
import FamilySupportTypeDrawer from "./family-support-type-drawer";



const FamilySupportTypeList = ({ }) => {
  const { t: transl } = useTranslation();

  const [familySupportTypeDrawerOpen, setAddFamilySupportTypeOpen] = useState<boolean>(false);
  const [editableFamilySupportType, setEditableFamilySupportType] = useState<FamilySupportType>();

  const toggleFamilySupportTypeDrawer = () => {
    setEditableFamilySupportType({} as FamilySupportType);
    setAddFamilySupportTypeOpen(!familySupportTypeDrawerOpen);
  };

  const handleEdit = (familySupportTypeItem: FamilySupportType) => {
    toggleFamilySupportTypeDrawer();
    setEditableFamilySupportType(familySupportTypeItem);
  };

  const fetchFamilySupportTypes = (
    params: GetRequestParam
  ): Promise<IApiResponse<FamilySupportType[]>> => {
    return familySupportTypeApiService.getAll({ ...params });
  };

  const {
    data: familySupportTypes,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<FamilySupportType[]>({
    queryKey: ["familySupportTypes"],
    fetchFunction: fetchFamilySupportTypes,
  });

  const handleDelete = async (familySupportTypeId: string) => {
    await familySupportTypeApiService.delete(familySupportTypeId);
    refetch();
  };

  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        dataConfig={{
          items: familySupportTypes || [],
          fetchDataFunction: fetchFamilySupportTypes,
          isLoading: isLoading
        }}
        paginationConfig={{
          pagination: pagination,
          onChange: handlePageChange,
        }}
        tableConfig={{
          headers: familySupportTypeColumns(
            handleEdit,
            handleDelete,
            transl
          ),
        }}
        headerConfig={{
          title: "Family Support Types",
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleFamilySupportTypeDrawer,
          permission: {
            action: "create",
            subject: "familySupportType",
          },
        }}
      />

      {familySupportTypeDrawerOpen && (
        <FamilySupportTypeDrawer
          refetch={refetch}
          open={familySupportTypeDrawerOpen}
          toggle={toggleFamilySupportTypeDrawer}
          familySupportTypeItem={editableFamilySupportType as FamilySupportType}
        />
      )}
    </>
  );
};

export default FamilySupportTypeList;
