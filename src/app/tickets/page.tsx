import clsx from "clsx";
import Link from "next/link";
import { CheckIcon, DocumentIcon, PencilIcon } from "@/components/icons";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  OPEN: <DocumentIcon />,
  IN_PROGRESS: <PencilIcon />,
  DONE: <CheckIcon />,
};

const TicketsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tighter">Tickets Page</h2>
        <p className="text-muted-foreground text-sm">
          All your tickets in one place
        </p>
      </div>

      <div className="animate-fade-from-top flex flex-1 flex-col items-center gap-y-4">
        {initialTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="w-full max-w-[420px] gap-y-4 border border-slate-100 p-4"
          >
            <div>{TICKET_ICONS[ticket.status]}</div>
            <h3 className="truncate text-lg font-bold">{ticket.title}</h3>
            <p
              className={clsx("truncate text-sm", {
                "line-through": ticket.status === "DONE",
              })}
            >
              {ticket.content}
            </p>
            <Link href={ticketPath(ticket.id)} className="text-sm underline">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
