import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import smallTeamApiService from "src/services/team/small-team-service";
import Member from "src/types/member/member";
import { GetRequestParam, IApiPayload, defaultGetRequestParam } from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";
import SmallTeam from "src/types/team/small-team";

const useSmallTeam = (
  initialQueryParams: GetRequestParam = defaultGetRequestParam,
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newSmallTeam, setNewSmallTeam] = useState<SmallTeam | undefined>();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams,
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidateSmallTeamsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["smallTeams"] });
  };

  const {
    data: allSmallTeams,
    isLoading: allLoading,
    error: allError,
    refetch,
  } = useQuery({
    queryKey: ["smallTeams", queryParams],
    queryFn: () =>
      smallTeamApiService
        .getAll(
          { ...defaultGetRequestParam, ...queryParams },
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

  const fetchSmallTeams = (
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

  const useGetOneSmallTeam = (smallTeamId: string) => {
    return useQuery({
      queryKey: ["smallTeams", smallTeamId],
      queryFn: () =>
      smallTeamApiService
          .getOne(smallTeamId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  const addNewSmallTeam = async (body: IApiPayload<SmallTeam>) => {
    setNewSmallTeam(undefined);

    return await smallTeamApiService.create(body);
    invalidateSmallTeamsQuery();
  };

  const updateSmallTeam = async (body: IApiPayload<SmallTeam>) => {
    setNewSmallTeam(undefined);

    return await smallTeamApiService.update(body.data.id, body);
    invalidateSmallTeamsQuery();
  };
  const assignSmallTeamMember = async (body: IApiPayload<Member>) => {
    return await smallTeamApiService.assignSmallTeamMember(body);
  };
  const updateSmallTeamMember = async (body: IApiPayload<Member>) => {
    return await smallTeamApiService.updateSmallTeamMember(body.data.id, body);
  };

  const deleteSmallTeam = async (smallTeamId: string) => {
    await smallTeamApiService.delete(smallTeamId);
    invalidateSmallTeamsQuery();
  };
  const useGetSmallTeamMembers = (smallTeamId: string) => {
    return useQuery({
      queryKey: ["smallTeam-users", smallTeamId],
      queryFn: () =>
        smallTeamApiService
          .getSmallTeamMembers(smallTeamId, defaultGetRequestParam)
          .then((response) => response),
    });
  };
  const useGetMembersAttendance = (smallTeamId: string) => {
    return useQuery({
      queryKey: ["smallTeam-users", smallTeamId],
      queryFn: () =>
        smallTeamApiService
          .getMembersAttendance(smallTeamId, defaultGetRequestParam)
          .then((response) => response),
    });
  };

  return {
    updateSmallTeam,
    pagination,
    allSmallTeams,
    newSmallTeam,
    setNewSmallTeam,
    isLoading: allLoading,
    error: allError,
    useGetOneSmallTeam,
    addNewSmallTeam,
    deleteSmallTeam,
    fetchSmallTeams,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    useGetSmallTeamMembers,
    assignSmallTeamMember,
    updateSmallTeamMember,
    useGetMembersAttendance,
  };
};

export default useSmallTeam;
