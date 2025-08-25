import { Prisma } from "@prisma/client";
import { clsx } from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
  /* LucideTrash, */
} from "lucide-react";
import Link from "next/link";
// import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
// import { deleteTicket } from "../actions/delete-ticket";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: { user: { select: { username: true } } };
  }>;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  );

  /* const deleteButton = (
    <ConfirmDialog
      action={deleteTicket.bind(null, ticket.id)}
      trigger={
        <Button variant="outline" size="icon">
          <LucideTrash className="h-4 w-4" />
        </Button>
      }
    />
  ); */

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
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
        <CardFooter className="flex justify-between">
          <p className="text-muted-foreground text-sm">
            {ticket.deadline} by {ticket.user.username}
          </p>
          <p className="text-muted-foreground text-sm">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {/* {deleteButton} */}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};

export { TicketItem };
