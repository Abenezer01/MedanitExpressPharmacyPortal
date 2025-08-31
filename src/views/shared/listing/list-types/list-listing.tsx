import { Stack } from "@mui/material";
import { gridSpacing } from "src/configs/app-constants";

const ListListing = <T extends {}>({
  items,
  ItemViewComponent,
}: {
  items: T[];
  ItemViewComponent: React.ComponentType<{ data: T }>;
}) => {
  return (
    <Stack spacing={gridSpacing}>
      {items?.map((item, index) => (
        <ItemViewComponent key={index} data={item}></ItemViewComponent>
      ))}
    </Stack>
  );
};

export default ListListing;
