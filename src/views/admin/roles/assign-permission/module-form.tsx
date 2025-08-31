import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { appModulesNames } from "src/configs/app-constants";
import usePermissionSelection from "src/hooks/admin/permission-selection-hook";

// Define the types for permission and props
interface AssignPermissionComponentProps {
  roleId: string;
}

interface AccordionDetailProps {
  module: string;
  roleId: string;
}

const AccordionDetail: React.FC<AccordionDetailProps> = ({
  module,
  roleId,
}) => {
  const {
    permissions,
    selectedPermissions,
    isLoading,
    isSubmitting,
    error,
    handleCheckboxChange,
    handleSelectAll,
    handleModelSelectAll,
    handleSubmit,
  } = usePermissionSelection(roleId, module);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const models = Array.from(
    new Set(permissions.map((permission) => permission.model)),
  );
  const permissionHeaders = Array.from(
    new Set(permissions.map((permission) => permission.name)),
  );

  return (
    <AccordionDetails>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Model</TableCell>
            {permissionHeaders.map((header, index) => (
              <TableCell key={index}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={permissions
                      .filter((permission) => permission.name === header)
                      .every(
                        (permission) => selectedPermissions[permission.id],
                      )}
                    indeterminate={
                      permissions
                        .filter((permission) => permission.name === header)
                        .some(
                          (permission) => selectedPermissions[permission.id],
                        ) &&
                      !permissions
                        .filter((permission) => permission.name === header)
                        .every(
                          (permission) => selectedPermissions[permission.id],
                        )
                    }
                    onChange={(e) => handleSelectAll(e.target.checked, header)}
                  />
                  <Typography>{header}</Typography>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={permissions
                      .filter((permission) => permission.model === model)
                      .every(
                        (permission) => selectedPermissions[permission.id],
                      )}
                    indeterminate={
                      permissions
                        .filter((permission) => permission.model === model)
                        .some(
                          (permission) => selectedPermissions[permission.id],
                        ) &&
                      !permissions
                        .filter((permission) => permission.model === model)
                        .every(
                          (permission) => selectedPermissions[permission.id],
                        )
                    }
                    onChange={(e) =>
                      handleModelSelectAll(model, e.target.checked)
                    }
                  />
                  <Typography>{model}</Typography>
                </Box>
              </TableCell>
              {permissionHeaders.map((permissionName) => {
                const permission = permissions.find(
                  (p) => p.model === model && p.name === permissionName,
                );

                return (
                  <TableCell key={permission?.id}>
                    {permission && (
                      <Checkbox
                        checked={selectedPermissions[permission.id] || false}
                        onChange={() => handleCheckboxChange(permission.id)}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Assign Permissions"}
        </Button>
      </Box>
    </AccordionDetails>
  );
};

const AssignPermissionComponent: React.FC<AssignPermissionComponentProps> = ({
  roleId,
}) => {
  const [selectedModule, setSelectedModule] = useState<string>(""); // state to store selected module

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedModule(event.target.value);
  };

  return (
    <div>
      <Grid container>
        <Grid item ml={5}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="module-select-label">Select Module</InputLabel>
            <Select
              labelId="module-select-label"
              id="module-select"
              value={selectedModule}
              onChange={handleChange}
              label="Select Module"
            >
              {appModulesNames.map((module, index) => (
                <MenuItem key={index} value={module}>
                  {module.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {selectedModule && (
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AccordionDetail roleId={roleId} module={selectedModule} />
            </Grid>
          </Grid>
        </AccordionDetails>
      )}
    </div>
  );
};

export default AssignPermissionComponent;
