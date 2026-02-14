import { Section, Text } from "@react-email/components";

type EmailHeaderProps = {
  /** Optional custom logo URL - defaults to text logo */
  logoUrl?: string;
  /** Alternative text for the logo */
  logoAlt?: string;
};

/**
 * EmailHeader component
 * 
 * Displays the TicketBounty branding at the top of emails.
 * Can be customized with a logo image or defaults to text-based branding.
 */
export const EmailHeader = ({ logoUrl, logoAlt = "TicketBounty" }: EmailHeaderProps) => {
  return (
    <Section className="mb-8 border-b border-gray-200 pb-6">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={logoAlt}
          width="150"
          height="40"
          className="mx-auto"
        />
      ) : (
        <Text className="m-0 text-center text-2xl font-bold tracking-tight text-gray-900">
          Ticket<span className="text-yellow-600">Bounty</span>
        </Text>
      )}
    </Section>
  );
};
