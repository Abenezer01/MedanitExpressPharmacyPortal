import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import positionApiService from "src/services/team/position-service";
import { defaultGetRequestParam } from "src/types/requests";
import { GetRequestParam } from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";
import Position from "src/types/team/position";

const usePosition = (
  initialQueryParams: GetRequestParam = defaultGetRequestParam
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newPosition, setNewPosition] = useState<Position | undefined>();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams,
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidatePositionsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["positions"] });
  };

  const {
    data: allPositions,
    isLoading: allLoading,
    error: allError,
    refetch,
  } = useQuery({
    queryKey: ["positions", queryParams],
    queryFn: () =>
      positionApiService
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

  const fetchPositions = (
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

  const useGetOnePosition = (positionId: string) => {
    return useQuery({
      queryKey: ["positions", positionId],
      queryFn: () =>
        positionApiService
          .getOne(positionId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  const addNewPosition = async (body: { data: Position; files: any[] }) => {
    setNewPosition(undefined);
    return await positionApiService.create(body);
    invalidatePositionsQuery();
  };
  const updatePosition = async (body: { data: Position; files: any[] }) => {
    setNewPosition(undefined);
    return await positionApiService.update(body.data.id, body);
    invalidatePositionsQuery();
  };

  const deletePosition = async (positionId: string) => {
    await positionApiService.delete(positionId);
    invalidatePositionsQuery();
  };
  const useGetPositionMembers = (positionId: string) => {
    return useQuery({
      queryKey: ["position-users", positionId],
      queryFn: () =>
        positionApiService
          .getPositionMembers(positionId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  return {
    updatePosition,
    pagination,
    allPositions,
    newPosition,
    setNewPosition,
    isLoading: allLoading,
    error: allError,
    useGetOnePosition,
    addNewPosition,
    deletePosition,
    fetchPositions,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    useGetPositionMembers,
  };
};

export default usePosition;
