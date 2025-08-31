import { Masonry } from "@mui/lab";

const MasonryListing = <T extends {}>({
  items,
  ItemViewComponent,
}: {
  items: T[];
  ItemViewComponent: React.ComponentType<{ data: T }>;
}) => {
  return (
    <Masonry columns={{ xs: 1, sm: 2, lg: 4, xl: 4 }} spacing={2}>
      {items?.map((item, index) => (
        <ItemViewComponent key={index} data={item}></ItemViewComponent>
      ))}
    </Masonry>
  );
};

export default MasonryListing;
