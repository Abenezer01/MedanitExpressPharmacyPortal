// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// ** Custom Component Import
import CustomTextField from "src/@core/components/mui/text-field";

// ** Icon Imports
import Icon from "src/@core/components/icon";
import FilterList from "./filter";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateActionConfig } from "src/types/general/listing";
import { AbilityContext } from "src/layouts/components/acl/Can";
import { IconButton, Typography } from "@mui/material";

interface ListHeaderProps {
  createActionConfig: CreateActionConfig;
  headerProps: {
    title: string;
    features: {
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
        onSearch: (searchTerm: string, searchingKey: string[]) => void;
        searchKeys?: string[];
        permission: {
          action: string;
          subject: string;
        };
      };
      export?: {
        enabled: boolean;
        permission: {
          action: string;
          subject: string;
        };
        onExport?: () => void;
      };
    };
  };
}

const ListHeader = (props: ListHeaderProps) => {
  const { title, features } = props.headerProps;
  const { filter, search, export: exportFeature } = features;
  // ** Props
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const { t: transl } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const ability = useContext(AbilityContext);



  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      search?.onSearch?.(term, features?.search?.searchKeys || []);
    }, 2000);

    setTimerId(newTimerId);
  };

  const handleFilterSubmit = (values: Record<string, any>) => {
    filter?.onFilter?.(values);
  };
  return (
    <Fragment>
      {filter?.enabled && filter.component && (
        <FilterList
          open={filterOpen}
          toggle={toggleFilter}
          handleFilter={handleFilterSubmit}
          FilterComponentItems={filter.component}
          initialValues={{
            is_child: false,
          }}
        />
      )}
      <Box
        sx={{
          py: 4,
          px: 6,
          rowGap: 2,
          columnGap: 4,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5">{transl(title)}</Typography>
        </Box>
        <Box
          sx={{
            rowGap: 2,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {search?.enabled && (
            <CustomTextField
              value={searchTerm}
              sx={{ mr: 4 }}
              placeholder={"Search " + transl(title)}
              onChange={handleSearchChange}
            />
          )}
          <Box
            sx={{
              rowGap: 2,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {props.createActionConfig.show && (
              ability.can(
                props.createActionConfig?.permission?.action,
                props.createActionConfig?.permission?.subject,
              ) ?
                <IconButton
                  color="primary"
                  onClick={props.createActionConfig.onClick}
                >
                  <Icon icon="tabler:plus" fontSize={20} />
                </IconButton>
                :
                <Button
                  onClick={props.createActionConfig.onClick}
                  variant="contained"
                  sx={{ "& svg": { mr: 2 } }}
                >

                  <Icon fontSize="1.125rem" icon="tabler:plus" />
                  {transl("create")}
                </Button>)
            }
            {filter?.enabled && (
              <Button
                onClick={toggleFilter}
                variant="contained"
                sx={{ "& svg": { mr: 2 }, ml: 2 }}
              >
                <Icon fontSize="1.125rem" icon="tabler:adjustments" />
                {transl("filter")}
              </Button>
            )}
            {exportFeature?.enabled && exportFeature.onExport && (
              <Button
                onClick={exportFeature.onExport}
                variant="contained"
                sx={{ "& svg": { mr: 2 }, ml: 2 }}
              >
                <Icon fontSize="1.125rem" icon="tabler:file-export" />
                {transl("export")}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ListHeader;
