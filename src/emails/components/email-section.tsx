import { Section } from "@react-email/components";

type EmailSectionProps = {
  /** Content to display in the section */
  children: React.ReactNode;
  /** Optional background color for the section */
  background?: "transparent" | "gray";
  /** Vertical padding size */
  padding?: "sm" | "md" | "lg";
  /** Optional CSS class name */
  className?: string;
};

/**
 * EmailSection component
 * 
 * Reusable content section wrapper with consistent spacing.
 * Use this to organize content into logical groups within emails.
 * 
 * @example
 * <EmailSection padding="lg" background="gray">
 *   <Text>Your content here</Text>
 * </EmailSection>
 */
export const EmailSection = ({
  children,
  background = "transparent",
  padding = "md",
  className = "",
}: EmailSectionProps) => {
  const paddingClasses = {
    sm: "py-3",
    md: "py-6",
    lg: "py-8",
  };
  
  const backgroundClasses = {
    transparent: "bg-transparent",
    gray: "bg-gray-50",
  };
  
  const combinedClassName = `${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`.trim();
  
  return <Section className={combinedClassName}>{children}</Section>;
};
