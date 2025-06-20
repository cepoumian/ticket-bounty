import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) => {
  const prevTimestamp = useRef(actionState.timestamp);
  // Check if the action state has been updated by comparing the current timestamp with the previous one
  // This helps to avoid unnecessary re-renders and effects when the action state hasn't changed
  // This is useful when the action state is updated multiple times in quick succession
  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdate) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
    // Update the previous timestamp to the current one
    prevTimestamp.current = actionState.timestamp;
  }, [isUpdate, actionState, options]);
};

export { useActionFeedback };
