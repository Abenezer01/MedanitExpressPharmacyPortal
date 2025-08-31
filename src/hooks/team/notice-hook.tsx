import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import noticeBoardService from "src/services/team/notice-board-service";

import { IApiPayload, defaultGetRequestParam } from "src/types/requests";
import { GetRequestParam } from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";
import Notice from "src/types/team/notice-board";

const useNoticeBoard = (
  initialQueryParams: GetRequestParam = defaultGetRequestParam,
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newNotice, setNewNotice] = useState<Notice | undefined>();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams,
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidateNoticesQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["smallTeams"] });
  };

  const {
    data: allNotices,
    isLoading: allLoading,
    error: allError,
    refetch,
  } = useQuery({
    queryKey: ["smallTeams", queryParams],
    queryFn: () =>
      noticeBoardService
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

  const fetchNotices = (
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

  const useGetOneNotice = (smallTeamId: string) => {
    return useQuery({
      queryKey: ["smallTeams", smallTeamId],
      queryFn: () =>
        noticeBoardService
          .getOne(smallTeamId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  const addNewNotice = async (body: IApiPayload<Notice>) => {
    setNewNotice(undefined);

    return await noticeBoardService.create(body);
    invalidateNoticesQuery();
  };

  const updateNotice = async (body: IApiPayload<Notice>) => {
    setNewNotice(undefined);

    return await noticeBoardService.update(body.data.id, body);
    invalidateNoticesQuery();
  };

  const deleteNotice = async (smallTeamId: string) => {
    await noticeBoardService.delete(smallTeamId);
    invalidateNoticesQuery();
  };

  return {
    updateNotice,
    pagination,
    allNotices,
    newNotice,
    setNewNotice,
    isLoading: allLoading,
    error: allError,
    useGetOneNotice,
    addNewNotice,
    deleteNotice,
    fetchNotices,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default useNoticeBoard;
