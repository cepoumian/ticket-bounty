import EmailWelcome from "@/emails/auth/email-welcome";
import { resend } from "@/lib/resend";

export const sendEmailWelcome = async (
  username: string,
  email: string,
  loginUrl: string,
) => {
  return await resend.emails.send({
    from: "no-reply@app.ticket-bounty.xyz",
    to: email,
    subject: "Welcome to TicketBounty",
    react: <EmailWelcome toName={username} loginUrl={loginUrl} />,
  });
};
