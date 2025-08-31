import { useState, useEffect } from "react";
import roleApiService from "src/services/admin/role-service";
import Permission from "src/types/admin/role/permission";

const usePermissionSelection = (roleId: string, module: string) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPermissions();
  }, [roleId, module]);
  const fetchPermissions = async () => {
    try {
      setIsLoading(true);
      const response = await roleApiService.getPermissionByRole(roleId, {
        filter: { module },
      });
      const initialPermissions = response.payload;
      setPermissions(initialPermissions);

      const initialSelections: { [key: string]: boolean } = {};
      initialPermissions.forEach((permission) => {
        initialSelections[permission.id] = permission.selected;
      });
      setSelectedPermissions(initialSelections);
    } catch (err) {
      setError("Error loading permissions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (permissionId: string) => {
    setSelectedPermissions((prevState) => ({
      ...prevState,
      [permissionId]: !prevState[permissionId],
    }));
  };

  const handleSelectAll = (isSelected: boolean, name: string) => {
    const updatedSelections = { ...selectedPermissions };
    permissions.forEach((permission) => {
      if (permission.name === name) {
        updatedSelections[permission.id] = isSelected;
      }
    });
    setSelectedPermissions(updatedSelections);
  };

  const handleModelSelectAll = (model: string, isSelected: boolean) => {
    const updatedSelections = { ...selectedPermissions };
    permissions.forEach((permission) => {
      if (permission.model === model) {
        updatedSelections[permission.id] = isSelected;
      }
    });
    setSelectedPermissions(updatedSelections);
  };
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Transform selectedPermissions to array of { id: string, is_selected: boolean }
      const permissionsArray = Object.keys(selectedPermissions).map(
        (permissionId) => ({
          id: permissionId,
          is_selected: selectedPermissions[permissionId],
        }),
      );
      await roleApiService.assignPermission(roleId, {
        data: { permissions: permissionsArray },
        files: [],
      });
      fetchPermissions();

      // Optionally refetch or update state after submission
    } catch (err) {
      // Handle the error, e.g., setError('Error assigning permissions');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    permissions,
    selectedPermissions,
    isLoading,
    isSubmitting,
    error,
    handleCheckboxChange,
    handleSelectAll,
    handleModelSelectAll,
    handleSubmit,
  };
};

export default usePermissionSelection;