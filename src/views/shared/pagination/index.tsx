import React, { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

interface CustomTablePaginationProps {
  onPaginationChange: (pageSize: number, page: number) => void;
  pagination: {
    pageSize: number;
    page: number;
    total?: number;
    lastPage?: number;
  } | null;
}

const CustomTablePagination: React.FC<CustomTablePaginationProps> = ({
  onPaginationChange,
  pagination,
}) => {
  const router = useRouter();

  // Helper to safely parse and validate query parameters
  const parseQueryParam = (param: string | string[] | undefined, fallback: number): number => {
    const parsed = parseInt(param as string, 10);
    return !isNaN(parsed) && parsed > 0 ? parsed : fallback;
  };

  const defaultPage = parseQueryParam(router.query.page, pagination?.page || 1) - 1;
  const defaultPageSize = parseQueryParam(router.query.pageSize, pagination?.pageSize || 10);

  const [page, setPage] = useState(defaultPage);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);

  useEffect(() => {
    const query = { ...router.query, page: (page + 1).toString(), pageSize: rowsPerPage.toString() };
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });

    // Notify parent component of page and pageSize changes
    onPaginationChange(rowsPerPage, page + 1);
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page
  };

  const totalRows = pagination?.total || 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Typography sx={{ mr: 2, whiteSpace: "nowrap" }}>
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Items per page"
        />
      </Typography>
    </div>
  );
};

export default CustomTablePagination;
