import { Text } from "@react-email/components";
import { EmailButton } from "../components/email-button";
import { EmailLayout } from "../components/email-layout";
import { EmailSection } from "../components/email-section";

type EmailWelcomeProps = {
  toName: string;
  loginUrl: string;
};

const EmailWelcome = ({ toName, loginUrl }: EmailWelcomeProps) => {
  return (
    <EmailLayout preview="Welcome to TicketBounty!">
      <EmailSection padding="sm">
        <Text className="m-0 text-center text-2xl font-bold text-gray-900">
          Hi {toName}, welcome to TicketBounty!
        </Text>
      </EmailSection>
      <EmailSection padding="md">
        <Text className="m-0 mb-4 text-base leading-relaxed text-gray-700">
          We’re excited to have you on board. Let us know if you ever have
          questions!
        </Text>
      </EmailSection>
      <EmailSection padding="md">
        <div className="text-center">
          <EmailButton href={loginUrl} variant="primary">
            Get Started
          </EmailButton>
        </div>
      </EmailSection>
    </EmailLayout>
  );
};

EmailWelcome.PreviewProps = {
  toName: "John Doe",
  loginUrl: "https://ticket-bounty.xyz/sign-in",
};

export default EmailWelcome;
