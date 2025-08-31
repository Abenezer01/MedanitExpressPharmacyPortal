import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import roleApiService from "src/services/admin/role-service";
import Role from "src/types/admin/role";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import RoleDrawer from "src/views/admin/roles/role-drawer";
import { roleColumns } from "src/views/admin/roles/role-row-column";

import ItemsListing from "src/views/shared/listing";

const RoleList = ({}) => {
  const [rolesDrawerOpen, setAddRoleOpen] = useState<boolean>(false);
  const [editableRole, setEditableRole] = useState<Role>();
  const handleEdit = (roles: Role) => {
    toggleRoleDrawer();
    setEditableRole(roles);
  };
  const { t: transl } = useTranslation();



  const toggleRoleDrawer = () => {
    setEditableRole({} as Role);
    setAddRoleOpen(!rolesDrawerOpen);
  };
  async function handleDelete(id: string): Promise<void> {
    await roleApiService.delete(id);
  }
  const fetchRoles = (
    params: GetRequestParam
  ): Promise<IApiResponse<Role[]>> => {
    return roleApiService.getAll({ ...params });
  };
  
  const {
    data: roles,
    isLoading,
    pagination,
    handlePageChange,
    handleSearch,
    refetch,
  } = usePaginatedFetch<Role[]>({
    queryKey: ["roles"],
    fetchFunction: fetchRoles,
  });


  return (
    <>
      <ItemsListing
          type={ITEMS_LISTING_TYPE.table.value}
        dataConfig={{
          items: roles || [],
          fetchDataFunction: fetchRoles,
          isLoading,
        }}
        paginationConfig={{
          pagination,
          onChange: (pageSize, page) => {
            handlePageChange(pageSize, page);
          }
        }}
        tableConfig={{
          headers: roleColumns(handleEdit, handleDelete, transl)
        }}
        headerConfig={{
          title: 'roles',
          features: {
            search: {
              enabled: true,
              onSearch: handleSearch,
              searchKeys: ['name'],
              permission: {
                action: 'read',
                subject: 'role'
              }
            },
           
          }
        }}
        createActionConfig={{
          show: true,
          onClick: toggleRoleDrawer,
          permission: {
            action: 'create',
            subject: 'role'
          }
        }}
      />

      {rolesDrawerOpen && (
        <RoleDrawer
          refetch={refetch}
          open={rolesDrawerOpen}
          toggle={toggleRoleDrawer}
          role={editableRole as Role}
        />
      )}
    </>
  );
};
RoleList.acl = {
  action: "read",
  subject: "role",
};
export default RoleList;
