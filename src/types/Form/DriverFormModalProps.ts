import type { FullDriverTable } from "../Driver/FullDriverTable";

export interface DriverFormModalProps {
  open: boolean;
  onClose: () => void;
  driver?: FullDriverTable | null; // null = create mode
  onSuccess?: () => void;
}
