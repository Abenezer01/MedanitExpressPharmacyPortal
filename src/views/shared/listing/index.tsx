import { Container } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { isArray } from "lodash";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import {
  CreateActionConfig,
  defaultCreateActionConfig,
} from "src/types/general/listing";
import { GetRequestParam, IApiResponse, defaultGetRequestParam } from "src/types/requests";
import { Pagination } from "src/types/requests/pagination";
import Loader from "src/views/components/loader";
import Page from "src/views/components/page/page";
import PaginationComponent from "../pagination";
import ListHeader from "./header";
import GridListing from "./list-types/grid-listing";
import ListListing from "./list-types/list-listing";
import MasonryListing from "./list-types/masonry-listing";
import TableListing from "./list-types/table-listing";

interface ItemsListingProps<T> {
  type: string;
  dataConfig: {
    items: T[];
    fetchDataFunction?: (params: GetRequestParam) => Promise<IApiResponse<T[]>>;
    isLoading?: boolean;
  };
  paginationConfig?: {
    pagination?: Pagination | null;
    onChange?: (pageSize: number, page: number) => void;
  };
  tableConfig?: {
    headers?: GridColDef[];
  };
  headerConfig?: {
    title?: string;
    features?: {
      filter?: {
        enabled: boolean;
        onFilter: (values: Record<string, any>) => void;
        permission: {
          action: string;
          subject: string;
        };
        component?: React.ComponentType<any>;
      };
      search?: {
        enabled: boolean;
        onSearch: (searchTerm: string, searchKeys: string[]) => void;
        searchKeys: string[],
        permission: {
          action: string;
          subject: string;
        };
      };
      export?: {
        enabled: boolean;
        onExport?: () => void;
        permission: {
          action: string;
          subject: string;
        };
      };
    };
  };
  createActionConfig?: CreateActionConfig;
  ItemViewComponent?: React.ComponentType<{ data: T }>;
  additionalParams?: Record<string, any>;
  hasListHeader?: boolean;
}

const ItemsListing = <T extends {}>({
  type = ITEMS_LISTING_TYPE.grid.value,

  dataConfig = {
    items: [],
    fetchDataFunction: undefined,
    isLoading: false,
  },
  paginationConfig = {
    pagination: undefined,
    onChange: undefined
  },
  tableConfig = {
    headers: []
  },
  headerConfig = {
    title: "",
    features: {}
  },
  createActionConfig = defaultCreateActionConfig,
  ItemViewComponent,
  additionalParams = {},
  hasListHeader = true,
}: ItemsListingProps<T>) => {
  const { i18n } = useTranslation();

  const [fetchRequestParams] = useState<GetRequestParam>(
    defaultGetRequestParam,
  );
  const [sortModel, setSortModel] = useState<{ property: string; direction: string } | null>(null);
  const onPagination =
    paginationConfig.onChange ||
    ((pageSize: any, page: any) => {
      const fetchParam: GetRequestParam = {
        ...fetchRequestParams,
        locale: i18n.language,
        ...additionalParams,
        pagination: { pageSize: pageSize, page: page },
        sorting: sortModel,
      };
      dataConfig.fetchDataFunction && dataConfig.fetchDataFunction(fetchParam);
    });

  const handleSortModelChange = (model: { property: string; direction: string } | null) => {
    setSortModel(model);
    if (dataConfig.fetchDataFunction) {
      const fetchParam: GetRequestParam = {
        ...fetchRequestParams,
        locale: i18n.language,
        ...additionalParams,
        pagination: paginationConfig.pagination,
        sorting: model,
      };
      dataConfig.fetchDataFunction(fetchParam);
    }
  };

  const listingComponents = {
    [ITEMS_LISTING_TYPE.masonry.value]: ItemViewComponent && (
      <MasonryListing ItemViewComponent={ItemViewComponent} items={dataConfig.items} />
    ),
    [ITEMS_LISTING_TYPE.list.value]: ItemViewComponent && (
      <ListListing ItemViewComponent={ItemViewComponent} items={dataConfig.items} />
    ),
    [ITEMS_LISTING_TYPE.table.value]: tableConfig?.headers && (
      <TableListing
        isLoading={dataConfig.isLoading || false}
        pagination={paginationConfig.pagination as Pagination}
        onPagination={onPagination}
        items={dataConfig.items}
        columns={tableConfig?.headers}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
      />
    ),
    default: ItemViewComponent && (
      <GridListing ItemViewComponent={ItemViewComponent} items={dataConfig.items} />
    ),
  };
  listingComponents[ITEMS_LISTING_TYPE.table.value]



  return (
    <Page titleId={headerConfig.title}>
      {hasListHeader && (
        <ListHeader
          createActionConfig={{
            ...defaultCreateActionConfig,
            ...createActionConfig,
          }}
          headerProps={{
            title: headerConfig.title || "",
            features: {
              ...headerConfig.features,
              filter: headerConfig.features?.filter ? {
                ...headerConfig.features.filter,
              } : undefined,
              search: headerConfig.features?.search ? {
                ...headerConfig.features.search,
              } : undefined
            },
          }}
        />
      )}

      {dataConfig.isLoading ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        isArray(dataConfig.items) && (
          <Fragment>
            {listingComponents[type] || listingComponents.default}
            <></>
            {type !== ITEMS_LISTING_TYPE.table.value && paginationConfig.pagination && (
              <Container>
                <PaginationComponent
                  onPaginationChange={onPagination}
                  pagination={paginationConfig.pagination}
                ></PaginationComponent>
              </Container>
            )}
          </Fragment>
        )
      )}
    </Page>
  );
};

export default ItemsListing;
