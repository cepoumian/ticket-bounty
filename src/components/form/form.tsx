import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feddback";
import { ActionState } from "./utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

const Form = ({
  action,
  actionState,
  children,
  onSuccess,
  onError,
}: FormProps) => {
  // Custom hook to handle action state feedback
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
      // Call the onSuccess callback if provided.
      /* if (onSuccess) {
        onSuccess(actionState);
      } */
      // Use optional chaining instead of a conditional to avoid unnecessary checks.
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
      onError?.(actionState);
    },
  });
  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
};

export { Form };
