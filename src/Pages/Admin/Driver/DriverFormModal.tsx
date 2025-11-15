import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
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
import { Controller, useForm } from "react-hook-form";
import {
  driverFormSchema,
  type driverFormSchemaType,
} from "./validation/driverFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DriverFormTextField from "./Components/DriverFormTextFields";
import { useEffect } from "react";
import type { DriverFormModalProps } from "../../../types/Form/DriverFormModalProps";
import { EMPTY_DRIVER_DEFAULTS } from "../../../Constants/constants";
import { useDriverFormData } from "./Hooks/FormOptions";
import { useDriverFormSubmit } from "./Hooks/FormUpdateAdd";

const DriverFormModal: React.FC<DriverFormModalProps> = ({
  open,
  onClose,
  driver,
  onSuccess,
}) => {
  const { nations, teams, isLoading, error: dataError } = useDriverFormData();

  // Initialize form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<driverFormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(driverFormSchema),
    defaultValues: driver ?? EMPTY_DRIVER_DEFAULTS,
  });

  // Reset form when driver prop changes (switching between create/edit modes)
  useEffect(() => {
    reset(driver ? { ...driver } : EMPTY_DRIVER_DEFAULTS);
  }, [driver, reset]);

  const mutation = useDriverFormSubmit(driver, onClose, onSuccess);

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="driver-form-title"
    >
      <DialogTitle>{driver ? "Edit Driver" : "Add New Driver"}</DialogTitle>
      <Box component="form" onSubmit={onSubmit} noValidate>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Loading State */}
          {isLoading && (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress size={40} />
            </Box>
          )}

          {/* Error State */}
          {dataError && (
            <Alert severity="error">
              Failed to load form data. Please try again.
            </Alert>
          )}

          {/* Mutation Error */}
          {mutation.error && (
            <Alert severity="error" onClose={() => mutation.reset()}>
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Failed to save driver. Please try again."}
            </Alert>
          )}
          {!isLoading && (
            <>
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
              <DriverFormTextField
                name="raceNumber"
                label="Race number"
                type="number"
                autoComplete="bday"
                error={errors.raceNumber?.message}
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
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            color="inherit"
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={mutation.isPending}
            variant="contained"
            color="primary"
          >
            {mutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : driver ? (
              "Save Changes"
            ) : (
              "Create Driver"
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DriverFormModal;
