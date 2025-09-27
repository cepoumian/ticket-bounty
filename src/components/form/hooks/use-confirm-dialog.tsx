import { cloneElement, useActionState, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form } from "../form";
import { SubmitButton } from "../submit-button";
import { ActionState, EMPTY_ACTION_STATE } from "../utils/to-action-state";

type UseConfirmDialogProps = {
  action: () => Promise<ActionState>;
  trigger: React.ReactElement;
  title?: string;
  description?: string;
  onSuccess?: (actionState: ActionState) => void;
};

const useConfirmDialog = ({
  action,
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand the consequences.",
  onSuccess,
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  } as React.HTMLAttributes<HTMLElement>);

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess?.(actionState);
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <SubmitButton label="submit" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
};

export { useConfirmDialog };
