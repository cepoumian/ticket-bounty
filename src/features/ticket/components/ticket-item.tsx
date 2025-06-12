import { Ticket } from "@prisma/client";
import { clsx } from "clsx";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { ticketPath } from "@/paths";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  return (
    <div
      className={clsx("flex w-full gap-x-1", {
        "max-w-[420px]": !isDetail,
        "max-w-[580px]": isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <h3 className="truncate text-2xl font-bold">{ticket.title}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </p>
        </CardContent>
      </Card>
      {/* If isDetail, we don't need the button link to the ticket's details */}
      {isDetail ? null : (
        <div className="flex flex-col gap-y-1">{detailButton}</div>
      )}
    </div>
  );
};

export { TicketItem };
