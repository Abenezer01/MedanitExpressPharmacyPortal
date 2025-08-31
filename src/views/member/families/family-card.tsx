// components/FamilyList.tsx
import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import Family from 'src/types/member/family';
import RowOptions from 'src/views/shared/listing/row-options';

const FamilyCard = ({
  family,
  onEdit,
  onDelete,
}: {
  family: Family;
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
                  {family.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {family?.representative.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <Box>
                  <RowOptions onEdit={onEdit} onDelete={() => onDelete(family.id)} item={family} options={[]} />
                </Box>
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default FamilyCard;
