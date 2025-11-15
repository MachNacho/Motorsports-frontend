import { useQueryClient, useMutation } from "@tanstack/react-query";
import { driverService } from "../../../../API/Services/driverService";
import { QUERY_KEYS } from "../../../../Constants/queryKeys";
import type { FullDriverTable } from "../../../../types/Driver/FullDriverTable";
import type { driverFormSchemaType } from "../validation/driverFormSchema";

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
  });

  return mutation;
};
