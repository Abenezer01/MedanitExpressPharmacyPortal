import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import departmentApiService from "src/services/team/department-service";
import { defaultGetRequestParam } from "src/types/requests";
import { GetRequestParam } from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";
import TeamMember from "src/types/team/team-member";
import Department from "src/types/team/department";

const useDepartment = (
  initialQueryParams: GetRequestParam = defaultGetRequestParam,
  parentDepartmentId = "",
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newDepartment, setNewDepartment] = useState<Department | undefined>();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams,
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidateDepartmentsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["departments"] });
  };

  const {
    data: allDepartments,
    isLoading: allLoading,
    error: allError,
    refetch,
  } = useQuery({
    queryKey: ["departments", queryParams],
    queryFn: () =>
      departmentApiService
        .getAll(
          { ...defaultGetRequestParam, ...queryParams, filter: { ...queryParams.filter, parent_department_id: parentDepartmentId } },
        )
        .then((response) => {
          setPagination(response._attributes.pagination);

          return response.payload;
        }),
  });

  const handlePageChange = (newPage: number) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        page: newPage,
        pageSize: prevParams.pagination?.pageSize || pageSize,
      },
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setQueryParams((prevParams) => ({
      ...prevParams,
      pagination: { ...prevParams.pagination, page: 1, pageSize: newPageSize },
    }));
  };

  const fetchDepartments = (
    nextPageQueryParams: GetRequestParam = defaultGetRequestParam,
  ) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      ...nextPageQueryParams,
      pagination: {
        ...(prevParams.pagination || {}), // Use an empty object as the default value
        ...nextPageQueryParams.pagination,
        page:
          nextPageQueryParams.pagination?.page ||
          prevParams.pagination?.page ||
          1,
        pageSize:
          nextPageQueryParams.pagination?.pageSize !== undefined
            ? nextPageQueryParams.pagination.pageSize
            : prevParams.pagination?.pageSize || pageSize,
      },
    }));
    refetch();
  };

  const useGetOneDepartment = (departmentId: string) => {
    return useQuery({
      queryKey: ["departments", departmentId],
      queryFn: () =>
        departmentApiService
          .getOne(departmentId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  const addNewDepartment = async (body: { data: Department; files: any[] }) => {
    setNewDepartment(undefined);
    return await departmentApiService.create(body);
    invalidateDepartmentsQuery();
  };
  const updateDepartment = async (body: { data: Department; files: any[] }) => {
    setNewDepartment(undefined);
    return await departmentApiService.update(body.data.id, body);
    invalidateDepartmentsQuery();
  };
  const addDepartmentMember = async (body: {
    data: TeamMember;
    files: any[];
  }) => {
    return await departmentApiService.createDepartmentMember(body);
  };
  const updateDepartmentMember = async (body: {
    data: TeamMember;
    files: any[];
  }) => {
    return await departmentApiService.updateDepartmentMember(
      body.data.id,
      body,
    );
  };

  const deleteDepartment = async (departmentId: string) => {
    await departmentApiService.delete(departmentId);
    invalidateDepartmentsQuery();
  };
  const useGetDepartmentMembers = (departmentId: string) => {
    return useQuery({
      queryKey: ["department-users", departmentId],
      queryFn: () =>
        departmentApiService
          .getDepartmentMembers(departmentId, defaultGetRequestParam)
          .then((response) => response),
    });
  };

  return {
    updateDepartment,
    pagination,
    allDepartments,
    newDepartment,
    setNewDepartment,
    isLoading: allLoading,
    error: allError,
    useGetOneDepartment,
    addNewDepartment,
    deleteDepartment,
    fetchDepartments,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    useGetDepartmentMembers,
    addDepartmentMember,
    updateDepartmentMember,
  };
};

export default useDepartment;
