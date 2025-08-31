import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import roleApiService from "src/services/admin/role-service";
import Role from "src/types/admin/role";
import { GetRequestParam, defaultGetRequestParam } from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";

const useRole = (
  initialQueryParams: GetRequestParam = defaultGetRequestParam,
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newRole, setNewRole] = useState<Role | undefined>();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams,
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidateRolesQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["roles"] });
  };

  const {
    data: allRoles,
    isLoading: allLoading,
    error: allError,
    refetch,
  } = useQuery({
    queryKey: ["roles", queryParams],
    queryFn: () =>
      roleApiService
        .getAll({ ...defaultGetRequestParam, ...queryParams })
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

  const fetchRoles = (
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

  const useGetOneRole = (roleId: string) => {
    return useQuery({
      queryKey: ["roles", roleId],
      queryFn: () =>
        roleApiService
          .getOne(roleId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  const addNewRole = async (body: { data: Role; files: any[] }) => {
    setNewRole(undefined);

    return await roleApiService.create(body);
    invalidateRolesQuery();
  };
  const updateRole = async (body: { data: Role; files: any[] }) => {
    setNewRole(undefined);

    return await roleApiService.update(body.data.id, body);
    invalidateRolesQuery();
  };

  const deleteRole = async (roleId: string) => {
    await roleApiService.delete(roleId);
    invalidateRolesQuery();
  };

  return {
    updateRole,
    pagination,
    allRoles,
    newRole,
    setNewRole,
    isLoading: allLoading,
    error: allError,
    useGetOneRole,
    addNewRole,
    deleteRole,
    fetchRoles,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default useRole;
