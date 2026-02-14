import { Text } from "@react-email/components";
import { EmailButton } from "../components/email-button";
import { EmailLayout } from "../components/email-layout";
import { EmailSection } from "../components/email-section";

type EmailPasswordResetProps = {
  toName: string;
  url: string;
};

/**
 * Password Reset Email
 *
 * Sent when a user requests to reset their password.
 * Includes security messaging and expiry information.
 */
const EmailPasswordReset = ({ toName, url }: EmailPasswordResetProps) => {
  return (
    <EmailLayout preview="Reset your password - expires in 2 hours">
      {/* Main heading */}
      <EmailSection padding="sm">
        <Text className="m-0 text-center text-2xl font-bold text-gray-900">
          Reset Your Password
        </Text>
      </EmailSection>

      {/* Greeting and instructions */}
      <EmailSection padding="md">
        <Text className="m-0 mb-4 text-base leading-relaxed text-gray-700">
          Hello {toName},
        </Text>
        <Text className="m-0 mb-4 text-base leading-relaxed text-gray-700">
          We received a request to reset the password for your TicketBounty
          account. Click the button below to create a new password.
        </Text>
      </EmailSection>

      {/* CTA Button */}
      <EmailSection padding="md">
        <div className="text-center">
          <EmailButton href={url}>Reset Password</EmailButton>
        </div>
      </EmailSection>

      {/* Expiry notice */}
      <EmailSection padding="sm" background="gray">
        <Text className="m-0 text-center text-sm text-gray-600">
          ⏱️ This link will expire in <strong>2 hours</strong> for security
          reasons.
        </Text>
      </EmailSection>

      {/* Security message */}
      <EmailSection padding="md">
        <Text className="m-0 mb-2 text-sm leading-relaxed text-gray-600">
          If you didn&apos;t request a password reset, you can safely ignore
          this email. Your password will remain unchanged.
        </Text>
        <Text className="m-0 text-sm leading-relaxed text-gray-600">
          For security, this link can only be used once. If you need to reset
          your password again, please submit a new request.
        </Text>
      </EmailSection>

      {/* Alternative link (for email clients that don't support buttons) */}
      <EmailSection padding="sm">
        <Text className="m-0 text-center text-xs text-gray-500">
          Button not working?{" "}
          <a href={url} className="text-yellow-600 underline">
            Copy this link
          </a>
        </Text>
      </EmailSection>
    </EmailLayout>
  );
};

EmailPasswordReset.PreviewProps = {
  toName: "Cesar Poumian",
  url: "http://localhost:3000/password-reset/abc123",
};

export default EmailPasswordReset;
