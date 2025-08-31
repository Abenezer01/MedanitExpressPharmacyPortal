// components/FamilyList.tsx
import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import Family, { Child } from 'src/types/child/child';
import RowOptions from 'src/views/shared/listing/row-options';

const ChildCard = ({
  child,
  onEdit,
  onDelete,
}: {
  child: Child;
  onEdit: (category: Family) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography variant="h5" component="div">
                  {child.member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {child?.member.last_name}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <Box>

                  <RowOptions onEdit={onEdit} onDelete={() => onDelete(child.id)} item={child} options={[]} />
                </Box>
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default ChildCard;
