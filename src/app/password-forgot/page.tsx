import { CardCompact } from "@/components/card-compact";
import { PasswordForgotForm } from "@/features/password/components/password-forgot-form";

const PasswordForgotPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Forgot Password"
        description="Enter your email to reset your password"
        content={<PasswordForgotForm />}
        className="animate-fade-in-from-top w-full max-w-[420px]"
      />
    </div>
  );
};

export default PasswordForgotPage;
