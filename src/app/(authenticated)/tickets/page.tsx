import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { SearchParams } from "@/features/ticket/search-params";

type TicketsPageProps = {
  searchParams: Promise<SearchParams>;
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const { user } = await getAuth();
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="My Tickets" description="All your tickets in one place" />

      <CardCompact
        title="Create Ticket"
        description="Create a new ticket to track your issues or requests"
        content={<TicketUpsertForm />}
        className="w-full max-w-[420px] self-center"
      />

      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} searchParams={await searchParams} />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
