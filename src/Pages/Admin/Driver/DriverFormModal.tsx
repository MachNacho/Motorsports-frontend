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
  Grid,
  Radio,
  RadioGroup,
  Stack,
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
      maxWidth="lg"
      fullWidth
      aria-labelledby="driver-form-title"
    >
      <DialogTitle sx={{ color: "black" }}>
        {driver ? "Edit Driver" : "Add New Driver"}
      </DialogTitle>
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{
          "& *": {
            color: "black !important",
          },
          "& .MuiInputBase-input": {
            color: "black !important",
          },
          "& .MuiFormLabel-root": {
            color: "black !important",
          },
          "& .MuiSvgIcon-root": {
            color: "black !important",
          },
          "& .MuiOutlinedInput-root fieldset": {
            borderColor: "black !important",
          },
        }}
      >
        <DialogContent>
          {/* Loading State */}
          {isLoading && (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress size={40} />
            </Box>
          )}

          {/* Errorz State */}
          {dataError ? (
            <Alert severity="error">
              Failed to load form data. Please try again.
            </Alert>
          ) : null}

          {/* Mutation Error */}
          {mutation.error ? (
            <Alert severity="error" onClose={() => mutation.reset()}>
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Failed to save driver. Please try again."}
            </Alert>
          ) : null}
          {!isLoading && (
            <Grid container spacing={2}>
              <Grid size={3}>
                <Box
                  component="fieldset"
                  sx={{ p: 2, border: "1px solid", borderRadius: 1 }}
                >
                  <legend>
                    <Typography>Details</Typography>
                  </legend>
                  <Stack spacing={2}>
                    <DriverFormTextField
                      name="firstname"
                      label="First name"
                      type="text"
                      autoComplete="given-name"
                      error={errors.firstname?.message}
                      disabled={mutation.isPending}
                      register={
                        register as unknown as ReturnType<
                          typeof useForm
                        >["register"]
                      }
                      multiline={false}
                    />
                    <DriverFormTextField
                      name="middleName"
                      label="Middle name"
                      type="text"
                      autoComplete="family-name"
                      error={errors.middleName?.message}
                      disabled={mutation.isPending}
                      register={
                        register as unknown as ReturnType<
                          typeof useForm
                        >["register"]
                      }
                      multiline={false}
                    />
                    <DriverFormTextField
                      name="lastname"
                      label="Last name"
                      type="text"
                      autoComplete="family-name"
                      error={errors.lastname?.message}
                      disabled={mutation.isPending}
                      register={
                        register as unknown as ReturnType<
                          typeof useForm
                        >["register"]
                      }
                      multiline={false}
                    />
                    <DriverFormTextField
                      name="birthDate"
                      label="Birth date"
                      type="Date"
                      autoComplete="bday"
                      error={errors.birthDate?.message}
                      disabled={mutation.isPending}
                      register={
                        register as unknown as ReturnType<
                          typeof useForm
                        >["register"]
                      }
                      multiline={false}
                    />
                    {/* <DriverFormTextField
                    name="imageURL"
                    label="image URL"
                    type="url"
                    autoComplete="url"
                    error={errors.imageURL?.message}
                    disabled={mutation.isPending}
                    register={
                      register as unknown as ReturnType<
                        typeof useForm
                      >["register"]
                    }
                  /> */}
                    <DriverFormTextField
                      name="raceNumber"
                      label="Race number"
                      type="number"
                      autoComplete="bday"
                      error={errors.raceNumber?.message}
                      disabled={mutation.isPending}
                      register={
                        register as unknown as ReturnType<
                          typeof useForm
                        >["register"]
                      }
                      multiline={false}
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
                  </Stack>
                </Box>
              </Grid>

              <Grid size={3}>
                <Box>
                  <Box
                    component="fieldset"
                    sx={{ p: 2, border: "1px solid", borderRadius: 1 }}
                  >
                    <legend>
                      <Typography>Stats</Typography>
                    </legend>
                    <Stack spacing={2}>
                      <DriverFormTextField
                        name="racesParticipated"
                        label="Races entered"
                        type="number"
                        autoComplete="bday"
                        error={errors.racesParticipated?.message}
                        disabled={mutation.isPending}
                        register={
                          register as unknown as ReturnType<
                            typeof useForm
                          >["register"]
                        }
                        multiline={false}
                      />
                      <DriverFormTextField
                        name="racePodiums"
                        label="Podiums"
                        type="number"
                        autoComplete="bday"
                        error={errors.racePodiums?.message}
                        disabled={mutation.isPending}
                        register={
                          register as unknown as ReturnType<
                            typeof useForm
                          >["register"]
                        }
                        multiline={false}
                      />
                      <DriverFormTextField
                        name="raceWins"
                        label="Wins"
                        type="number"
                        autoComplete="bday"
                        error={errors.racePodiums?.message}
                        disabled={mutation.isPending}
                        register={
                          register as unknown as ReturnType<
                            typeof useForm
                          >["register"]
                        }
                        multiline={false}
                      />
                      <DriverFormTextField
                        name="championshipTitles"
                        label="Championships"
                        type="number"
                        autoComplete="bday"
                        error={errors.championshipTitles?.message}
                        disabled={mutation.isPending}
                        register={
                          register as unknown as ReturnType<
                            typeof useForm
                          >["register"]
                        }
                        multiline={false}
                      />

                      <DriverFormTextField
                        name="careerPoints"
                        label="Points"
                        type="number"
                        autoComplete="bday"
                        error={errors.careerPoints?.message}
                        disabled={mutation.isPending}
                        register={
                          register as unknown as ReturnType<
                            typeof useForm
                          >["register"]
                        }
                        multiline={false}
                      />
                      <DriverFormTextField
                        name="racePole"
                        label="Race pole"
                        type="number"
                        autoComplete="bday"
                        error={errors.racePole?.message}
                        disabled={mutation.isPending}
                        register={
                          register as unknown as ReturnType<
                            typeof useForm
                          >["register"]
                        }
                        multiline={false}
                      />
                      <DriverFormTextField
                        name="raceLapsLed"
                        label="Race laps led"
                        type="number"
                        autoComplete="bday"
                        error={errors.raceLapsLed?.message}
                        disabled={mutation.isPending}
                        register={
                          register as unknown as ReturnType<
                            typeof useForm
                          >["register"]
                        }
                        multiline={false}
                      />
                    </Stack>
                  </Box>
                </Box>
              </Grid>
              <Grid size={6}>
                <Box
                  component="fieldset"
                  sx={{ p: 2, border: "1px solid", borderRadius: 1, mb: 2 }}
                >
                  <legend>
                    <Typography>Teams and nations</Typography>
                  </legend>
                  <Stack spacing={2}>
                    <Controller
                      name="teamId"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          slotProps={{
                            paper: {
                              sx: {
                                backgroundColor: "white",
                                color: "black",
                                "& .MuiAutocomplete-option": {
                                  color: "black",
                                },
                              },
                            },
                          }}
                          options={teams ?? []}
                          getOptionLabel={(option) => option.label ?? ""}
                          value={
                            teams?.find((t) => t.id === field.value) ?? null
                          }
                          onChange={(_, value) =>
                            field.onChange(value?.id ?? "")
                          }
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
                          slotProps={{
                            paper: {
                              sx: {
                                backgroundColor: "white",
                                color: "black",
                                "& .MuiAutocomplete-option": {
                                  color: "black",
                                },
                              },
                            },
                          }}
                          options={nations ?? []}
                          getOptionLabel={(option) => option.label ?? ""}
                          value={
                            nations?.find((n) => n.id === field.value) ?? null
                          }
                          onChange={(_, value) =>
                            field.onChange(value?.id ?? "")
                          }
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
                  </Stack>
                </Box>
                <Box
                  component="fieldset"
                  sx={{ p: 2, border: "1px solid", borderRadius: 1, mb: 2 }}
                >
                  <legend>
                    <Typography>Description</Typography>
                  </legend>
                  <DriverFormTextField
                    name="description"
                    type="Multiline"
                    autoComplete="bday"
                    error={errors.raceNumber?.message}
                    disabled={mutation.isPending}
                    register={
                      register as unknown as ReturnType<
                        typeof useForm
                      >["register"]
                    }
                    multiline={true}
                    maxCharacters={1}
                    maxHeight={320}
                    backgroundColor="#ffffffff"
                  />
                </Box>
              </Grid>
            </Grid>
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
          <Button onClick={() => reset()} disabled={mutation.isPending}>
            Reset
          </Button>
          <Button
            loading={mutation.isPending ? true : false}
            type="submit"
            sx={{ color: "white" }}
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
