import { GridColDef } from "@mui/x-data-grid";

// ** React Imports

// ** Next Imports

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Icon Imports

// ** Store Imports

// ** Custom Components Imports

// ** Utils Import

// ** Actions Imports

// ** Third Party Components

// ** Types Imports

// ** Custom Table Components Imports
import moment from "moment";
import { SessionFamilySupport } from "src/types/school/family-support";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
    row: SessionFamilySupport;
}

export const sessionFamilySupportColumns = (
    onEdit: (sessionFamilySupportItem: SessionFamilySupport) => void,
    onDelete: (id: string) => void,
    transl: (item: string) => string,
) => {
    return [
        {
            flex: 0.25,
            minWidth: 220,
            field: "family",
            headerName: transl("family"),
            sortable: true,
            renderCell: ({ row }: CellType) => (
                <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                    {row.family?.name || 'N/A'}
                </Typography>
            ),
        },
        {
            flex: 0.2,
            minWidth: 180,
            field: "FamilySupport",
            headerName: transl("familySupportType"),
            sortable: true,
            renderCell: ({ row }: CellType) => (
                <Typography sx={{ color: "text.secondary" }}>
                    {row.familySupportTypes && row.familySupportTypes.length > 0
                        ? (
                            <ul style={{ margin: 0, paddingLeft: 16 }}>
                                {row.familySupportTypes.map((fst, idx) => (
                                    <li key={fst.id || idx}>
                                        {fst.name || 'N/A'}
                                        {typeof fst.SessionFamilySupportType?.quantity === 'number' ? ` (${fst.SessionFamilySupportType.quantity})` : ''}
                                    </li>
                                ))}
                            </ul>
                        )
                        : 'N/A'}
                </Typography>
            ),
        },
        {
            flex: 0.25,
            minWidth: 280,
            field: "description",
            headerName: transl("description"),
            sortable: true,
            renderCell: ({ row }: CellType) => (
                <Typography sx={{ color: "text.secondary" }}>
                    {row.description || 'N/A'}
                </Typography>
            ),
        },
        {
            flex: 0.1,
            minWidth: 110,
            field: "created_at",
            headerName: transl("created"),
            sortable: true,
            renderCell: ({ row }: CellType) => (
                <Typography sx={{ color: "text.secondary" }}>
                    {row.created_at ? moment(row.created_at).format('DD/MM/YYYY') : 'N/A'}
                </Typography>
            ),
        },
        {
            flex: 0.1,
            minWidth: 100,
            sortable: false,
            field: "actions",
            headerName: transl("actions"),
            renderCell: ({ row }: CellType) => (
                <RowOptions
                    onEdit={() => onEdit(row)}
                    onDelete={() => onDelete(row.id)}
                    item={row}
                    editPermissionRule={{
                        action: "update",
                        subject: "sessionfamilysupport",
                    }}
                    deletePermissionRule={{
                        action: "delete",
                        subject: "sessionfamilysupport",
                    }}
                />
            ),
        },
    ] as GridColDef[];
};
