import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import userApiService from "src/services/admin/user-service";
import User from "src/types/admin/user";
import {
  GetRequestParam,
  IApiPayload,
  defaultGetRequestParam,
} from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";

const useUser = (
  initialQueryParams: GetRequestParam = defaultGetRequestParam,
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newUser, setNewUser] = useState<User | undefined>();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams,
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidateUsersQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const {
    data: allUsers,
    isLoading: allLoading,
    error: allError,
    refetch,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () =>
      userApiService
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

  const useGetOneUser = (userId: string) => {
    return useQuery({
      queryKey: ["users", userId],
      queryFn: () =>
        userApiService
          .getOne(userId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  const addNewUser = async (body: IApiPayload<User>) => {
    setNewUser(undefined);

    return await userApiService.create(body);
  };

  const updateUser = async (body: IApiPayload<User>) => {
    setNewUser(undefined);

    return await userApiService.update(body.data.id, body);
  };

  const deleteUser = async (userId: string) => {
    await userApiService.delete(userId);
    invalidateUsersQuery();
  };

  const fetchUsers = (
    nextPageQueryParams: GetRequestParam = defaultGetRequestParam,
  ) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      ...nextPageQueryParams,
      pagination: {
        ...(prevParams.pagination || {}),
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

  return {
    updateUser,
    pagination,
    allUsers,
    newUser,
    setNewUser,
    isLoading: allLoading,
    error: allError,
    useGetOneUser,
    addNewUser,
    deleteUser,
    fetchUsers,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default useUser;
