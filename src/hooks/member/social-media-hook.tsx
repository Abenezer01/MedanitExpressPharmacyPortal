import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import socialMediaApiService from "src/services/member/social-media-service";
import MemberSocialMedia, { SocialMedia } from "src/types/member/social-media";
import { GetRequestParam, defaultGetRequestParam } from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";

const useSocialMedia = (
  initialQueryParams: GetRequestParam = defaultGetRequestParam,
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newSocialMedia, setNewSocialMedia] = useState<
    SocialMedia | undefined
  >();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams,
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidateSocialMediasQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["socialMedias"] });
    queryClient.invalidateQueries({ queryKey: ["membersocialMedias"] });
  };

  const {
    data: allSocialMedias,
    isLoading: allLoading,
    error: allError,
    refetch,
  } = useQuery({
    queryKey: ["socialMedias", queryParams],
    queryFn: () =>
      socialMediaApiService
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
  const fetchSocialMedias = (
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

  const useGetOneSocialMedia = (socialMediaId: string) => {
    return useQuery({
      queryKey: ["socialMedias", socialMediaId],
      queryFn: () =>
        socialMediaApiService
          .getOne(socialMediaId, defaultGetRequestParam)
          .then((response) => response.payload),
    });
  };

  const addNewSocialMedia = async (body: {
    data: SocialMedia;
    files: any[];
  }) => {
    setNewSocialMedia(undefined);

    return await socialMediaApiService.create(body);
    invalidateSocialMediasQuery();
  };
  const updateSocialMedia = async (body: {
    data: SocialMedia;
    files: any[];
  }) => {
    setNewSocialMedia(undefined);

    return await socialMediaApiService.update(body.data.id, body);
    invalidateSocialMediasQuery();
  };

  const deleteSocialMedia = async (socialMediaId: string) => {
    await socialMediaApiService.delete(socialMediaId);
    invalidateSocialMediasQuery();
  };
  const deleteMemberSocialMedia = async (memberSocialMediaId: string) => {
    await socialMediaApiService.deleteMemberSocialMedia(memberSocialMediaId);
    invalidateSocialMediasQuery();
  };

  const useGetMemberSocialMedia = (memberId: string) => {
    const {
      data: memberSocialMedias,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ["membersocialMedias", memberId],
      queryFn: () =>
        socialMediaApiService
          .getAllMemberSocialMedia(memberId, defaultGetRequestParam)
          .then((response) => response.payload),
    });

    return { memberSocialMedias, isLoading, error, refetch };
  };
  const addNewMemberSocialMedia = async (body: {
    data: MemberSocialMedia;
    files: any[];
  }) => {
    return await socialMediaApiService.createMemberSocialMedia(body);
  };
  const updateMemberSocialMedia = async (body: {
    data: MemberSocialMedia;
    files: any[];
  }) => {
    return await socialMediaApiService.updateMemberSocialMedia(
      body.data.id,
      body,
    );
  };

  //address

  return {
    updateSocialMedia,
    pagination,
    allSocialMedias,
    newSocialMedia,
    setNewSocialMedia,
    isLoading: allLoading,
    error: allError,
    useGetOneSocialMedia,
    addNewSocialMedia,
    deleteSocialMedia,
    fetchSocialMedias,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange,

    //memberSocial Media
    useGetMemberSocialMedia,
    addNewMemberSocialMedia,
    updateMemberSocialMedia,
    deleteMemberSocialMedia,
  };
};

export default useSocialMedia;
