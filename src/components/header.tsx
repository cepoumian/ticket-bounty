import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/paths";

const Header = () => {
  return (
    <nav className="supports-backdrop-blur:bg-background/60 bg-background/95 fixed top-0 right-0 left-0 z-20 flex w-full justify-between border-b px-5 py-2.5 backdrop-blur">
      <div>
        <Link
          href={homePath()}
          className={buttonVariants({
            variant: "ghost",
          })}
        >
          <LucideKanban />
          <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div>
        <Link
          href={ticketsPath()}
          className={buttonVariants({
            variant: "default",
          })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
};

export { Header };
