import { Hr, Link, Section, Text } from "@react-email/components";

type EmailFooterProps = {
  /** Base URL for the application */
  baseUrl?: string;
};

/**
 * EmailFooter component
 *
 * Standard footer with helpful links and copyright information.
 * Maintains consistent branding across all emails.
 */
export const EmailFooter = ({
  baseUrl = "https://ticketbounty.com",
}: EmailFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Hr className="mx-0 my-8 w-full border-gray-200" />
      <Section className="mt-8">
        <Text className="mb-4 text-center text-sm text-gray-500">
          <Link
            href={`${baseUrl}/help`}
            className="mx-2 text-gray-500 underline"
          >
            Help Center
          </Link>
          {" · "}
          <Link
            href={`${baseUrl}/privacy`}
            className="mx-2 text-gray-500 underline"
          >
            Privacy Policy
          </Link>
          {" · "}
          <Link
            href={`${baseUrl}/terms`}
            className="mx-2 text-gray-500 underline"
          >
            Terms of Service
          </Link>
        </Text>
        <Text className="m-0 text-center text-xs text-gray-400">
          © {currentYear} TicketBounty. All rights reserved.
        </Text>
        <Text className="m-0 mt-2 text-center text-xs text-gray-400">
          You&apos;re receiving this email because you have an account with
          TicketBounty.
        </Text>
      </Section>
    </>
  );
};
