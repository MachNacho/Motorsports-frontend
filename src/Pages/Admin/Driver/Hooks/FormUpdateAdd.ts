import { useQueryClient, useMutation } from "@tanstack/react-query";
import { driverService } from "../../../../API/Services/driverService";
import { QUERY_KEYS } from "../../../../Constants/queryKeys";
import type { FullDriverTable } from "../../../../types/Driver/FullDriverTable";
import type { driverFormSchemaType } from "../validation/driverFormSchema";
import axios from "axios";

/**
 * Custom hook to manage driver form submission
 * Handles both create and update operations
 *
 * @param driver - Existing driver data (for edit mode)
 * @param onClose - Callback to close modal
 * @param onSuccess - Callback after successful submission
 * @returns Mutation object and submit handler
 */
export const useDriverFormSubmit = (
  driver: FullDriverTable | null | undefined,
  onClose: () => void,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: driverFormSchemaType) =>
      driver ? driverService.put(driver.id, data) : driverService.add(data),
    onSuccess: () => {
      // Invalidate queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DRIVERS.LIST });
      onSuccess?.();
      onClose();
    },
    onError: (error: unknown) => {
      let message = "Failed to save driver. Please try again.";
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;
        message =
          {
            400: "Invalid driver data",
            401: "Unauthorized. Please check your credentials.",
            403: "Access denied. Contact administrator.",
            404: "Driver not found.",
            500: "Server error. Try again later.",
          }[status] ?? `Unexpected error (${status})`;
      }
    },
  });

  return mutation;
};
