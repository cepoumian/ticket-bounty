import { Text } from "@react-email/components";
import {
  EmailButton,
  EmailLayout,
  EmailSection,
} from "../components";

type EmailTicketAssignedProps = {
  userName: string;
  ticketTitle: string;
  ticketUrl: string;
  assignedBy: string;
};

/**
 * Ticket Assigned Email
 * 
 * Example template showing component reusability.
 * Sent when a ticket is assigned to a user.
 */
const EmailTicketAssigned = ({
  userName,
  ticketTitle,
  ticketUrl,
  assignedBy,
}: EmailTicketAssignedProps) => {
  return (
    <EmailLayout preview={`New ticket assigned: ${ticketTitle}`}>
      {/* Main heading */}
      <EmailSection padding="sm">
        <Text className="m-0 text-center text-2xl font-bold text-gray-900">
          📋 New Ticket Assigned
        </Text>
      </EmailSection>

      {/* Greeting and ticket info */}
      <EmailSection padding="md">
        <Text className="m-0 mb-4 text-base leading-relaxed text-gray-700">
          Hi {userName},
        </Text>
        <Text className="m-0 mb-4 text-base leading-relaxed text-gray-700">
          {assignedBy} has assigned a new ticket to you:
        </Text>
      </EmailSection>

      {/* Ticket preview box */}
      <EmailSection padding="md" background="gray">
        <Text className="m-0 text-center text-lg font-semibold text-gray-900">
          {ticketTitle}
        </Text>
      </EmailSection>

      {/* CTA Button */}
      <EmailSection padding="md">
        <div className="text-center">
          <EmailButton href={ticketUrl}>
            View Ticket
          </EmailButton>
        </div>
      </EmailSection>

      {/* Additional info */}
      <EmailSection padding="md">
        <Text className="m-0 text-center text-sm text-gray-600">
          You can manage your notification preferences in your account settings.
        </Text>
      </EmailSection>
    </EmailLayout>
  );
};

// Preview props for email development server
EmailTicketAssigned.PreviewProps = {
  userName: "Sarah Johnson",
  ticketTitle: "Fix login page responsiveness on mobile devices",
  ticketUrl: "http://localhost:3000/tickets/ticket-123",
  assignedBy: "Mike Chen",
};

export default EmailTicketAssigned;
