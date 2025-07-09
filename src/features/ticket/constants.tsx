import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCircleCheck />,
};

const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

export { TICKET_ICONS, TICKET_STATUS_LABELS };
