import { Body, Container, Head, Html, Tailwind } from "@react-email/components";
import { EmailFooter } from "./email-footer";
import { EmailHeader } from "./email-header";

type EmailLayoutProps = {
  /** Main email content */
  children: React.ReactNode;
  /** Optional preview text (shows in inbox preview) */
  preview?: string;
  /** Whether to show the header */
  showHeader?: boolean;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Base URL for the application */
  baseUrl?: string;
};

/**
 * EmailLayout component
 *
 * Main wrapper for all emails. Provides consistent structure with:
 * - Responsive container
 * - Brand header
 * - Content area
 * - Standard footer
 *
 * Use this as the root component for all email templates.
 *
 * @example
 * <EmailLayout preview="Reset your password">
 *   <EmailSection>
 *     <Text>Your email content here</Text>
 *   </EmailSection>
 * </EmailLayout>
 */
export const EmailLayout = ({
  children,
  showHeader = true,
  showFooter = true,
  baseUrl,
}: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto bg-white font-sans">
          <Container className="mx-auto my-8 max-w-xl rounded-lg border border-gray-200 bg-white px-8 py-10">
            {showHeader && <EmailHeader />}
            {children}
            {showFooter && <EmailFooter baseUrl={baseUrl} />}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
