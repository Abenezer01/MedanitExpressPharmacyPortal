import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import childApiService from "src/services/child/child-service";
import Child from "src/types/child/child";
import { GetRequestParam, IApiResponse } from "src/types/requests";

import ItemsListing from "src/views/shared/listing";
import { childColumns } from "./child-row";
import ChildDrawer from "./child-drawer";

const ChildList = ({ }) => {
  const [childsDrawerOpen, setAddChildOpen] = useState<boolean>(false);
  const [editableChild, setEditableChild] = useState<Child>();
  const handleEdit = (childs: Child) => {
    toggleChildDrawer();
    setEditableChild(childs);
  };
  const { t: transl } = useTranslation();



  const toggleChildDrawer = () => {
    setEditableChild({} as Child);
    setAddChildOpen(!childsDrawerOpen);
  };
  async function handleDelete(id: string): Promise<void> {
    await childApiService.delete(id);
  }
  const fetchChilds = (
    params: GetRequestParam
  ): Promise<IApiResponse<Child[]>> => {
    return childApiService.getAll({ ...params });
  };

  const {
    data: childs,
    isLoading,
    pagination,
    handlePageChange,
    handleSearch,
    refetch,
  } = usePaginatedFetch<Child[]>({
    queryKey: ["childs"],
    fetchFunction: fetchChilds,
  });


  return (
    <>
      <ItemsListing

        type={ITEMS_LISTING_TYPE.table.value}
        dataConfig={{
          items: childs || [],
          fetchDataFunction: fetchChilds,
          isLoading
        }}
        paginationConfig={{
          pagination,
          onChange: (pageSize, page) => {
            handlePageChange(pageSize, page);
          }
        }}
        tableConfig={{
          headers: childColumns(handleEdit, handleDelete, transl)
        }}
        headerConfig={{
          title: 'childs',
          features: {
            search: {
              enabled: true,
              onSearch: handleSearch,
              searchKeys: ['name'],
              permission: {
                action: 'read',
                subject: 'child'
              }
            },

          }
        }}
        createActionConfig={{
          show: true,
          onClick: toggleChildDrawer,
          permission: {
            action: 'create',
            subject: 'child'
          }
        }}
      />

      {childsDrawerOpen && (
        <ChildDrawer
          refetch={refetch}
          open={childsDrawerOpen}
          toggle={toggleChildDrawer}
          child={editableChild as Child}
        />
      )}
    </>
  );
};
ChildList.acl = {
  action: "read",
  subject: "child",
};
export default ChildList;
