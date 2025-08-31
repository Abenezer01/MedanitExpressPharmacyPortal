import { Card } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowId,
} from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Pagination } from "src/types/requests/pagination";

interface TableListingProps {
  columns: GridColDef[];
  items: any[];
  pagination?: Pagination;
  isLoading: boolean;
  onPagination?: (pageSize: number, page: number) => void;
  sortModel?: { property: string; direction: string } | null;
  onSortModelChange?: (model: { property: string; direction: string } | null) => void;
}

const TableListing: React.FC<TableListingProps> = ({
  columns,
  items,
  pagination,
  onPagination,
  isLoading,
  sortModel,
  onSortModelChange,
}) => {
  const safePagination = pagination || { page: 0, pageSize: 10, total: 0 };
  const [, setSelectedRows] = useState<GridRowId[]>([]);
  const router = useRouter();

  // Helper to parse query parameters as numbers, falling back to defaults if invalid
  const parseQueryParam = (param: string | string[] | undefined, defaultValue: number): number => {
    const parsedValue = parseInt(param as string, 10);
    return !isNaN(parsedValue) && parsedValue >= 0 ? parsedValue : defaultValue;
  };

  // Only parse query params and set pagination model if pagination is present
  const defaultPage = pagination ? parseQueryParam(router.query.page, safePagination.page) - 1 : 0;
  const defaultPageSize = pagination ? parseQueryParam(router.query.pageSize, safePagination.pageSize) : 10;

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: defaultPage,
    pageSize: defaultPageSize,
  });

  // Synchronize paginationModel state with pagination prop changes
  useEffect(() => {
    if (pagination) {
      setPaginationModel({
        page: (pagination.page ?? 1) - 1,
        pageSize: pagination.pageSize ?? 10,
      });
    }
  }, [pagination?.page, pagination?.pageSize]);

  // Update query params and inform the parent component whenever pagination changes
  const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
    setPaginationModel(newPaginationModel);

    if (pagination) {
      // Update the query params in the URL
      const query = { ...router.query };
      query.page = (newPaginationModel.page + 1).toString(); // URL is 1-indexed
      query.pageSize = newPaginationModel.pageSize?.toString();
      router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
    }

    // Call the parent callback to trigger any necessary data fetching
    if (onPagination) {
      onPagination(newPaginationModel.pageSize, newPaginationModel.page + 1);
    }
  };

  useEffect(() => {
    if (pagination) {
      // Update the URL query params with the initial values if they are not set
      const query = { ...router.query };
      query.page = (paginationModel.page + 1).toString();
      query.pageSize = paginationModel.pageSize?.toString();
      router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
    }
  }, [paginationModel, pagination]);

  return (
    <Card>
      <DataGrid
        rows={items}
        pageSizeOptions={[5, 10, 25]}
        autoHeight
        pagination
        rowHeight={62}
        rowCount={safePagination?.total}
        columns={columns}
        paginationMode="server"
        checkboxSelection
        disableRowSelectionOnClick
        {...(pagination && {
          paginationModel: paginationModel,
          onPaginationModelChange: handlePaginationModelChange,
        })}
        sortModel={
          sortModel && sortModel.property && (sortModel.direction === "asc" || sortModel.direction === "desc")
            ? [{ field: sortModel.property, sort: sortModel.direction }]
            : []
        }
        onSortModelChange={(model: any[]) => {
          if (onSortModelChange) {
            if (model.length > 0) {
              onSortModelChange({ property: model[0].field, direction: model[0].sort });
            } else {
              onSortModelChange(null);
            }
          }
        }}
        onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
        loading={isLoading}
      />
    </Card>
  );
};

export default TableListing;
