import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import permissionApiService from "src/services/admin/permission-service";
import Permission from "src/types/admin/role/permission";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import PermissionDrawer from "src/views/admin/permissions/permission-drawer";
import { permissionColumns } from "src/views/admin/permissions/permission-row-column";

import ItemsListing from "src/views/shared/listing";

const PermissionList = ({ }) => {
  const [permissionsDrawerOpen, setAddPermissionOpen] = useState<boolean>(false);
  const [editablePermission, setEditablePermission] = useState<Permission>();
  const handleEdit = (permissions: Permission) => {
    togglePermissionDrawer();
    setEditablePermission(permissions);
  };
  const { t: transl } = useTranslation();



  const togglePermissionDrawer = () => {
    setEditablePermission({} as Permission);
    setAddPermissionOpen(!permissionsDrawerOpen);
  };
  async function handleDelete(id: string): Promise<void> {
    await permissionApiService.delete(id);
  }
  const fetchPermissions = (
    params: GetRequestParam
  ): Promise<IApiResponse<Permission[]>> => {
    return permissionApiService.getAll({ ...params });
  };

  const {
    data: permissions,
    isLoading,
    pagination,
    handlePageChange,
    handleSearch,
    refetch,
  } = usePaginatedFetch<Permission[]>({
    queryKey: ["permissions"],
    fetchFunction: fetchPermissions,
  });


  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        dataConfig={{
          items: permissions || [],
          fetchDataFunction: fetchPermissions,
          isLoading,
        }}
        paginationConfig={{
          pagination,
          onChange: (pageSize, page) => {
            handlePageChange(pageSize, page);
          }
        }}
        tableConfig={{
          headers: permissionColumns(handleEdit, handleDelete, transl)
        }}
        headerConfig={{
          title: 'permissions',
          features: {
            search: {
              enabled: true,
              onSearch: handleSearch,
              searchKeys: ['name'],
              permission: {
                action: 'read',
                subject: 'permission'
              }
            },

          }
        }}
        createActionConfig={{
          show: true,
          onClick: togglePermissionDrawer,
          permission: {
            action: 'create',
            subject: 'permission'
          }
        }}
      />

      {permissionsDrawerOpen && (
        <PermissionDrawer
          refetch={refetch}
          open={permissionsDrawerOpen}
          toggle={togglePermissionDrawer}
          permission={editablePermission as Permission}
        />
      )}
    </>
  );
};
PermissionList.acl = {
  action: "read",
  subject: "permission",
};
export default PermissionList;
