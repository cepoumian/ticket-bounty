"use client";

import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions/sign-out";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { homePath, signInPath, signUpPath } from "@/paths";
import { SubmitButton } from "./form/submit-button";
import { ThemeSwitcher } from "./theme/theme-switcher";

const Header = () => {
  const { user, isFetched } = useAuth();

  // Don't render the header until the user data is fetched
  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <form action={signOut}>
      <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
    </form>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({
          variant: "default",
        })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav className="animate-header-from-top supports-backdrop-blur:bg-background/60 bg-background/95 fixed top-0 right-0 left-0 z-20 flex w-full justify-between border-b px-5 py-2.5 backdrop-blur">
      <div className="flex items-center gap-x-2">
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
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
