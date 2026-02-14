import { Button } from "@react-email/components";

type EmailButtonProps = {
  /** URL the button links to */
  href: string;
  /** Button text content */
  children: React.ReactNode;
  /** Button style variant */
  variant?: "primary" | "secondary";
  /** Full width button */
  fullWidth?: boolean;
};

/**
 * EmailButton component
 * 
 * Consistent button styling for all email CTAs.
 * Supports primary (brand color) and secondary (neutral) variants.
 * 
 * @example
 * <EmailButton href="https://app.com/action">
 *   Take Action
 * </EmailButton>
 */
export const EmailButton = ({
  href,
  children,
  variant = "primary",
  fullWidth = false,
}: EmailButtonProps) => {
  const baseClasses =
    "inline-block rounded-lg px-6 py-3 text-center text-base font-semibold no-underline transition-colors";
  
  const variantClasses = {
    primary: "bg-yellow-600 text-yellow-950 hover:bg-yellow-700",
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  const className = `${baseClasses} ${variantClasses[variant]} ${widthClass}`.trim();
  
  return (
    <Button href={href} className={className}>
      {children}
    </Button>
  );
};
