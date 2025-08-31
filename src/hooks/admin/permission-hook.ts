import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import permissionApiService from "src/services/admin/permission-service";
import Permission from "src/types/admin/role/permission";
import { IApiPayload, defaultGetRequestParam } from "src/types/requests";
import { GetRequestParam } from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";

const usePermission = (
  initialQueryParams: GetRequestParam = defaultGetRequestParam,
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newPermission, setNewPermission] = useState<Permission | undefined>();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams,
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidatePermissionsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["permissions"] });
  };

  const {
    data: allPermissions,
    isLoading: allLoading,
    error: allError,
    refetch,
  } = useQuery({
    queryKey: ["permissions", queryParams],
    queryFn: () =>
      permissionApiService
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

  const fetchPermissions = (
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

  const useGetOnePermission = (permissionId: string) => {
    return useQuery({
      queryKey: ["permissions", permissionId],
      queryFn: () =>
        permissionApiService
          .getOne(permissionId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  const addNewPermission = async (body: IApiPayload<Permission>) => {
    setNewPermission(undefined);

    return await permissionApiService.create(body);
    invalidatePermissionsQuery();
  };
  const updatePermission = async (body: IApiPayload<Permission>) => {
    setNewPermission(undefined);

    return await permissionApiService.update(body.data.id, body);
    invalidatePermissionsQuery();
  };

  const deletePermission = async (permissionId: string) => {
    await permissionApiService.delete(permissionId);
    invalidatePermissionsQuery();
  };

  return {
    updatePermission,
    pagination,
    allPermissions,
    newPermission,
    setNewPermission,
    isLoading: allLoading,
    error: allError,
    useGetOnePermission,
    addNewPermission,
    deletePermission,
    fetchPermissions,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default usePermission;
