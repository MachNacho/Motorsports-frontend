import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import type React from "react";
import type { FullDriverTable } from "../../../types/Driver/FullDriverTable";
import { Controller, useForm } from "react-hook-form";
import {
  driverFormSchema,
  type driverFormSchemaType,
} from "./validation/driverFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { driverService } from "../../../API/Services/driverService";
import { QUERY_KEYS } from "../../../Constants/queryKeys";
import DriverFormTextField from "./Components/DriverFormTextFields";
import { useEffect } from "react";
import type { NationalityDTO } from "../../../types/Nationality/NationalityDTO";
import { nationalityService } from "../../../API/Services/nationalityService";
import { QUERY_CONFIG } from "../../../Constants/queryConfig";
import type { TeamOptions } from "../../../types/Team/TeamOptions";
import { teamService } from "../../../API/Services/teamService";

interface DriverFormModalProps {
  open: boolean;
  onClose: () => void;
  driver?: FullDriverTable | null; // null = create mode
  onSuccess?: () => void;
}

const emptyDriverDefaults = {
  firstname: "",
  middleName: "",
  lastname: "",
  birthDate: "",
  nationalityId: "",
  raceNumber: "",
  gender: "",
  imageURL: "",
  teamId: "",
};

const DriverFormModal: React.FC<DriverFormModalProps> = ({
  open,
  onClose,
  driver,
  onSuccess,
}) => {
  const queryClient = useQueryClient();

  // Fetch teams and nations
  const { data: nations } = useQuery<NationalityDTO[]>({
    queryKey: QUERY_KEYS.NATIONALITIES.LIST,
    queryFn: nationalityService.getAll,
    staleTime: QUERY_CONFIG.STALE_TIME.MEDIUM,
  });

  const { data: teams } = useQuery<TeamOptions[]>({
    queryKey: QUERY_KEYS.TEAMS.OPTIONS,
    queryFn: teamService.getOptions,
    staleTime: QUERY_CONFIG.STALE_TIME.MEDIUM,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<driverFormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(driverFormSchema),
    defaultValues: driver ? { ...driver } : emptyDriverDefaults,
  });

  useEffect(() => {
    reset(driver ? { ...driver } : emptyDriverDefaults);
  }, [driver, reset]);

  const mutation = useMutation({
    mutationFn: async (data: driverFormSchemaType) =>
      driver ? driverService.put(driver.id, data) : driverService.add(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DRIVERS.LIST });
      onSuccess?.();
      onClose();
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{driver ? "Edit Driver" : "Add New Driver"}</DialogTitle>
      <Box component="form" onSubmit={onSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <DriverFormTextField
            name="firstname"
            label="First name"
            type="text"
            autoComplete="given-name"
            error={errors.firstname?.message}
            disabled={mutation.isPending}
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
          />
          <DriverFormTextField
            name="middleName"
            label="Middle name"
            type="text"
            autoComplete="family-name"
            error={errors.middleName?.message}
            disabled={mutation.isPending}
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
          />
          <DriverFormTextField
            name="lastname"
            label="Last name"
            type="text"
            autoComplete="family-name"
            error={errors.lastname?.message}
            disabled={mutation.isPending}
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
          />
          <DriverFormTextField
            name="imageURL"
            label="image URL"
            type="url"
            autoComplete="url"
            error={errors.imageURL?.message}
            disabled={mutation.isPending}
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
          />
          <DriverFormTextField
            name="birthDate"
            label="Birth date"
            type="Date"
            autoComplete="bday"
            error={errors.birthDate?.message}
            disabled={mutation.isPending}
            register={
              register as unknown as ReturnType<typeof useForm>["register"]
            }
          />
          <Controller
            name="teamId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={teams ?? []}
                getOptionLabel={(option) => option.label ?? ""}
                value={teams?.find((t) => t.id === field.value) ?? null}
                onChange={(_, value) => field.onChange(value?.id ?? "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Teams"
                    error={!!errors.teamId}
                    helperText={errors.teamId?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="nationalityId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={nations ?? []}
                getOptionLabel={(option) => option.label ?? ""}
                value={nations?.find((n) => n.id === field.value) ?? null}
                onChange={(_, value) => field.onChange(value?.id ?? "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nations"
                    error={!!errors.nationalityId}
                    helperText={errors.nationalityId?.message}
                  />
                )}
              />
            )}
          />
          <FormControl component={"fieldset"}>
            <FormLabel>Gender</FormLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  {["Male", "Female", "Other"].map((g) => (
                    <FormControlLabel
                      key={g}
                      value={g}
                      control={<Radio />}
                      label={g}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <Typography sx={{ color: "error" }} variant="body2">
                {errors.gender.message}
              </Typography>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={mutation.isPending}
            variant="contained"
            color="primary"
          >
            {driver ? "Save Changes" : "Create Driver"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DriverFormModal;
