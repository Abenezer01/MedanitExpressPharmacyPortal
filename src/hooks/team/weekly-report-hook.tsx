import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import weeklyReportApiService from "src/services/team/weekly-report-service";
import { defaultGetRequestParam } from "src/types/requests";
import { GetRequestParam } from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";
import WeeklyReport from "src/types/team/weekly-report";

const useWeeklyReport = (
  initialQueryParams: GetRequestParam = defaultGetRequestParam,
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newWeeklyReport, setNewWeeklyReport] = useState<
    WeeklyReport | undefined
  >();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams,
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidateWeeklyReportsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["weeklyReport"] });
  };

  const {
    data: allWeeklyReports,
    isLoading: allLoading,
    error: allError,
    refetch,
  } = useQuery({
    queryKey: ["weeklyReport", queryParams],
    queryFn: () =>
      weeklyReportApiService
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

  const fetchWeeklyReports = (
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

  const useGetOneWeeklyReport = (weeklyReportId: string) => {
    return useQuery({
      queryKey: ["weeklyReport", weeklyReportId],
      queryFn: () =>
        weeklyReportApiService
          .getOne(weeklyReportId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  const useGetPrepareAttendance = (weeklyReportId: string, date: any) => {
    return useQuery({
      queryKey: ["prepareAttendance", weeklyReportId, date],
      queryFn: () =>
        weeklyReportApiService
          .prepareAttendance(weeklyReportId, {
            ...defaultGetRequestParam,
            filter: { ...defaultGetRequestParam.filter, date },
          })
          .then((response) => response.payload),
    });
  };

  const addNewWeeklyReport = async (body: {
    data: WeeklyReport;
    files: any[];
  }) => {
    setNewWeeklyReport(undefined);

    return await weeklyReportApiService.create(body);
  };
  const updateWeeklyReport = async (body: {
    data: WeeklyReport;
    files: any[];
  }) => {
    setNewWeeklyReport(undefined);

    return await weeklyReportApiService.update(body.data.id, body);
  };

  const deleteWeeklyReport = async (weeklyReportId: string) => {
    await weeklyReportApiService.delete(weeklyReportId);
    invalidateWeeklyReportsQuery();
  };
  const useGetWeeklyReportMembers = (weeklyReportId: string) => {
    return useQuery({
      queryKey: ["weeklyReport-users", weeklyReportId],
      queryFn: () =>
        weeklyReportApiService
          .getOne(weeklyReportId, defaultGetRequestParam)
          .then((response) => response),
    });
  };

  return {
    updateWeeklyReport,
    pagination,
    allWeeklyReports,
    newWeeklyReport,
    setNewWeeklyReport,
    isLoading: allLoading,
    error: allError,
    useGetOneWeeklyReport,
    addNewWeeklyReport,
    deleteWeeklyReport,
    fetchWeeklyReports,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    useGetWeeklyReportMembers,
    useGetPrepareAttendance,
  };
};

export default useWeeklyReport;
