import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { driverService } from "../../../API/Services/driverService";
import { QUERY_CONFIG } from "../../../Constants/queryConfig";
import { QUERY_KEYS } from "../../../Constants/queryKeys";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo, useState, useCallback } from "react";
import type { FullDriverTable } from "../../../types/Driver/FullDriverTable";
import DriverFormModal from "./DriverFormModal";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const DriverTable: React.FC = () => {
  const queryClient = useQueryClient();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({ open: false, message: "", severity: "info" });

  const [openModal, setOpenModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<FullDriverTable | null>(
    null
  );

  // Handle editing a driver
  const handleEdit = (driver: FullDriverTable) => {
    setSelectedDriver(driver);
    setOpenModal(true);
  };

  // Handle adding a new driver
  const handleAdd = () => {
    setSelectedDriver(null);
    setOpenModal(true);
  };

  // Fetch all drivers
  const {
    data: data,
    isLoading,
    isError,
    error,
  } = useQuery<FullDriverTable[]>({
    queryKey: [QUERY_KEYS.DRIVERS.LIST],
    queryFn: driverService.AdminGetALL,
    staleTime: QUERY_CONFIG.STALE_TIME.MEDIUM,
    retry: QUERY_CONFIG.RETRY,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => driverService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DRIVERS.LIST] });
      setSnackbar({
        open: true,
        message: "Driver deleted successfully",
        severity: "success",
      });
    },
    onError: (err: Error) => {
      setSnackbar({
        open: true,
        message: `Delete failed: ${err.message}`,
        severity: "error",
      });
    },
  });

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm("Are you sure you want to delete this driver?")) {
        deleteMutation.mutate(id);
      }
    },
    [deleteMutation]
  );

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const rows: GridRowsProp = data ?? [];

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "firstname", headerName: "First Name", flex: 1, minWidth: 150 },
      {
        field: "middleName",
        headerName: "Middle Name",
        flex: 1,
        minWidth: 150,
      },
      { field: "lastname", headerName: "Last Name", flex: 1, minWidth: 150 },
      {
        field: "birthDate",
        headerName: "Birth Date",
        width: 120,
      },
      {
        field: "nationName",
        headerName: "nationalityName",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "description",
        headerName: "Description",
        renderCell: (params) =>
          params.value && params.value.trim().length > 0 ? (
            <CheckIcon color="success" />
          ) : (
            <CloseIcon color="error" />
          ),
      },
      { field: "raceNumber", headerName: "#", width: 90 },
      { field: "gender", headerName: "Gender", width: 90 },
      { field: "teamName", headerName: "Team", flex: 1, minWidth: 200 },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Edit Driver">
                <IconButton color="primary" size="small">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            }
            label="Edit"
            onClick={() => handleEdit(params.row as FullDriverTable)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete Driver">
                <IconButton color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            }
            label="Delete"
            onClick={() => handleDelete(params.id as string)}
            disabled={deleteMutation.isPending}
          />,
        ],
      },
    ],
    [deleteMutation.isPending, handleDelete]
  );

  // Handle loading and error states
  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
      >
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
      >
        <Typography color="error">
          Error loading drivers: {(error as Error).message}
        </Typography>
      </Box>
    );

  return (
    <>
      {/* Modal for Add/Edit */}
      <DriverFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        driver={selectedDriver}
        onSuccess={() => {
          setOpenModal(false);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.DRIVERS.LIST],
          });
        }}
      />
      <Box
        sx={{
          paddingTop: 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100%",
        }}
      >
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{ alignSelf: "flex-start" }}
        >
          Add Driver
        </Button>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          disableRowSelectionOnClick
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            color: "Black",
            "& .MuiDataGrid-columnHeaders": { color: "Black" },
            "& .MuiDataGrid-cell": { color: "Black" },
            "& .MuiDataGrid-footerContainer": { color: "Black" },
            "& .MuiTablePagination-root": { color: "Black" },
            "& .MuiList-root": { color: "Black" },
            "& .MuiDataGrid-menuPaper": {
              backgroundColor: "black",
              color: "black",
            },
            "& .MuiMenuItem-root": {
              color: "black",
            },
          }}
        />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DriverTable;
