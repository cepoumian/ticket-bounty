# TicketBounty Email System

Professional, reusable email templates built with React Email and Resend.

## 🎨 Design System

Our emails follow a clean, minimal design inspired by modern SaaS products (Stripe, Linear). All emails:

- Use the TicketBounty brand colors (yellow-600 primary)
- Are mobile-responsive
- Work across all major email clients
- Include proper accessibility features
- Have consistent spacing and typography

## 📁 Structure

```
src/emails/
├── components/          # Shared email components
│   ├── email-layout.tsx    # Main wrapper with header/footer
│   ├── email-header.tsx    # Brand header
│   ├── email-footer.tsx    # Standard footer with links
│   ├── email-button.tsx    # Styled CTA buttons
│   ├── email-section.tsx   # Content section wrapper
│   └── index.tsx           # Barrel exports
└── password/
    └── email-password-reset.tsx  # Password reset template
```

## 🚀 Quick Start

### Preview Emails

```bash
npm run email
```

This launches the React Email development server where you can preview all email templates.

### Creating a New Email Template

1. Create a new file in the appropriate folder (e.g., `src/emails/welcome/email-welcome.tsx`)

2. Import the shared components:

```typescript
import { Text } from "@react-email/components";
import {
  EmailLayout,
  EmailButton,
  EmailSection,
} from "@/emails/components";
```

3. Build your email using the component system:

```typescript
type EmailWelcomeProps = {
  userName: string;
};

const EmailWelcome = ({ userName }: EmailWelcomeProps) => {
  return (
    <EmailLayout preview="Welcome to TicketBounty!">
      <EmailSection padding="md">
        <Text className="m-0 text-2xl font-bold text-gray-900">
          Welcome, {userName}!
        </Text>
        <Text className="text-gray-700">
          Thanks for joining TicketBounty...
        </Text>
      </EmailSection>

      <EmailSection padding="md">
        <EmailButton href="https://app.ticketbounty.com/onboarding">
          Get Started
        </EmailButton>
      </EmailSection>
    </EmailLayout>
  );
};

// Add preview props for development
EmailWelcome.PreviewProps = {
  userName: "John Doe",
};

export default EmailWelcome;
```

4. Send the email using Resend:

```typescript
import { resend } from "@/lib/resend";
import EmailWelcome from "@/emails/welcome/email-welcome";

await resend.emails.send({
  from: "TicketBounty <noreply@ticketbounty.com>",
  to: userEmail,
  subject: "Welcome to TicketBounty!",
  react: <EmailWelcome userName={userName} />,
});
```

## 🧩 Component Reference

### EmailLayout

Main wrapper for all emails. Includes header, footer, and responsive container.

**Props:**
- `children` - Email content
- `preview?` - Preview text shown in inbox
- `showHeader?` - Show/hide header (default: true)
- `showFooter?` - Show/hide footer (default: true)
- `baseUrl?` - Base URL for footer links

### EmailButton

Styled CTA button with brand colors.

**Props:**
- `href` - Link URL
- `children` - Button text
- `variant?` - "primary" (yellow) or "secondary" (gray)
- `fullWidth?` - Expand to full width

### EmailSection

Content section wrapper with consistent spacing.

**Props:**
- `children` - Section content
- `padding?` - "sm" | "md" | "lg"
- `background?` - "transparent" | "gray"
- `className?` - Additional CSS classes

### EmailHeader

Brand header with TicketBounty logo.

**Props:**
- `logoUrl?` - Custom logo image URL
- `logoAlt?` - Alt text for logo

### EmailFooter

Standard footer with links and copyright.

**Props:**
- `baseUrl?` - Base URL for links

## 🎨 Styling

Emails use Tailwind CSS classes via React Email's `<Tailwind>` component. Common colors:

- **Brand Yellow**: `text-yellow-600`, `bg-yellow-600`
- **Text**: `text-gray-900` (headings), `text-gray-700` (body), `text-gray-600` (muted)
- **Backgrounds**: `bg-white`, `bg-gray-50`
- **Borders**: `border-gray-200`

## 📱 Best Practices

1. **Always include preview text** in `EmailLayout` - this shows in inbox previews
2. **Use semantic HTML** - proper heading hierarchy, alt text for images
3. **Test across email clients** - use the preview server to check rendering
4. **Keep it simple** - email clients have limited CSS support
5. **Include plain text alternatives** - for links and buttons that might not work
6. **Add security messaging** - for sensitive actions like password resets
7. **Set expiry times** - for time-sensitive links
8. **Mobile-first** - most emails are opened on mobile devices

## 🔒 Security

For sensitive emails (password resets, verification, etc.):

- Always include "didn't request this?" messaging
- Show link expiry times
- Mention that links can only be used once
- Include a plain text version of the link
- Don't include sensitive information in the email body

## 🎯 Examples

Check `src/emails/password/email-password-reset.tsx` for a complete example showing:
- Proper component usage
- Security messaging
- Expiry notices
- Alternative link options
- Preview props for development

## 🤝 Contributing

When creating new email templates:

1. Use the shared component system
2. Add preview props for development
3. Include proper TypeScript types
4. Add comments for complex sections
5. Test in the email preview server
6. Update this README if adding new patterns

## 📚 Resources

- [React Email Documentation](https://react.email/docs)
- [React Email Components](https://react.email/docs/components)
- [Resend Documentation](https://resend.com/docs)
- [Email Client CSS Support](https://www.caniemail.com/)
