import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/general/use-paginated-fetch";
import departmentApiService from "src/services/team/department-service";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import Department from "src/types/team/department";

import ItemsListing from "src/views/shared/listing";
import DepartmentDrawer from "src/views/team/departments/add/department-drawer";
import { departmentColumns } from "src/views/team/departments/department-row-column";

const SubDepartmentList = ({
  parentDepartment,
}: {
  parentDepartment: Department;
}) => {
  const { t: transl } = useTranslation();
  const [departmentsDrawerOpen, setAddDepartmentOpen] =
    useState<boolean>(false);
  const [editableDepartment, setEditableDepartment] = useState<Department>();
  const handleEdit = (departments: Department) => {
    toggleDepartmentDrawer();
    setEditableDepartment(departments);
  };
  const fetchSubDepartments = (params: GetRequestParam): Promise<IApiResponse<Department[]>> => {
    return departmentApiService.getAll({ ...params, filter: { ...params.filter, parent_department_id: parentDepartment.id } });
  };
  // Access the hook methods and state
  const {
    data: subDepartments,
    isLoading,
    refetch,
    pagination,
    handlePageChange
  } = usePaginatedFetch<Department[]>({
    queryKey: ['subDepartments', parentDepartment.id],
    fetchFunction: fetchSubDepartments
  });
  const toggleDepartmentDrawer = () => {
    setEditableDepartment({} as Department);
    setAddDepartmentOpen(!departmentsDrawerOpen);
  };
  async function handleDelete(id: string): Promise<void> {
    await departmentApiService.delete(id);
  }

  return (
    <>
      <ItemsListing
        type={ITEMS_LISTING_TYPE.table.value}
        dataConfig={{
          items: subDepartments || [],
          fetchDataFunction: fetchSubDepartments,
          isLoading
        }}
        paginationConfig={{
          pagination,
          onChange: (pageSize, page) => {
            handlePageChange(pageSize, page);
          }
        }}

        tableConfig={{ headers: departmentColumns(handleEdit, handleDelete, transl) }}

      />

      {departmentsDrawerOpen && (
        <DepartmentDrawer
          parentDepartmentId={parentDepartment.id}
          refetch={refetch}
          open={departmentsDrawerOpen}
          toggle={toggleDepartmentDrawer}
          department={editableDepartment as Department}
        />
      )}
    </>
  );
};
export default SubDepartmentList;
