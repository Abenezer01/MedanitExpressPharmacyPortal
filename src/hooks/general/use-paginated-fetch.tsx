import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { defaultGetRequestParam, GetRequestParam, IApiResponse } from 'src/types/requests';
import { Pagination } from 'src/types/requests/pagination';
import { StringHelpers } from 'src/utils/string-helpers';

interface UsePaginatedFetchProps<T> {
    queryKey: string[];
    fetchFunction: (params: GetRequestParam) => Promise<IApiResponse<T>>;
    initialQueryParams?: GetRequestParam;
}

const usePaginatedFetch = <T,>({ queryKey, fetchFunction, initialQueryParams = defaultGetRequestParam }: UsePaginatedFetchProps<T>) => {
    const queryClient = useQueryClient();
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        pageSize: 10,
        total: 0,
        lastPage: 1
    });
    const [queryParams, setQueryParams] = useState<GetRequestParam>({ ...initialQueryParams });

    const invalidateQuery = () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
    };

    const handleSearch = (searchTerm: string, searchKeys: string[]) => {
        setQueryParams((prevParams: GetRequestParam): GetRequestParam => ({
            ...prevParams,
            filter: {
                ...prevParams.filter,
                ...StringHelpers.createSearchFilter(searchTerm, searchKeys)
            },
            pagination: {
                ...prevParams.pagination,
                page: 1,
                pageSize: prevParams?.pagination?.pageSize || 0
            }
        }));
    };

    const handleFilter = (filterValues: Record<string, any>) => {
        const cleanedFilterValues = StringHelpers.cleanObject(filterValues);
        setQueryParams((prevParams: GetRequestParam): GetRequestParam => ({
            ...prevParams,
            filter: cleanedFilterValues
        }));
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: [queryKey, queryParams],
        queryFn: () =>
            fetchFunction({ ...defaultGetRequestParam, ...queryParams }).then((response) => {
                setPagination(response._attributes.pagination);
                return response.payload;
            }),
        // Add this to prevent automatic refetching when queryParams changes
        enabled: true
    });

    const handlePageChange = (pageSize: number, newPage: number) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            pagination: {
                ...prevParams.pagination,
                page: newPage,
                pageSize: pageSize
            }
        }));
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            pagination: {
                page: 1,
                pageSize: newPageSize,
                total: pagination.total,
                lastPage: pagination.lastPage
            }
        }));
    };

    // Remove this useEffect as it's causing duplicate requests
    // useEffect(() => {
    //     refetch();
    // }, [queryParams]);

    return {
        data,
        isLoading,
        error,
        refetch,
        pagination,
        handlePageChange,
        handlePageSizeChange,
        invalidateQuery,
        handleSearch,
        handleFilter
    };
};

export default usePaginatedFetch;