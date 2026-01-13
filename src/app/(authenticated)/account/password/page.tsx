import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { PasswordChangeForm } from "@/features/password/components/password-change-form";
import { AccountTabs } from "../_navigation/tabs";

const PasswordPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Password"
        description="Keep your account secure"
        tabs={<AccountTabs />}
      />
      <div className="flex flex-1 flex-col items-center">
        <CardCompact
          title="Change Password"
          description="Enter your current password"
          content={<PasswordChangeForm />}
          className="animate-fade-in-from-top w-full max-w-[420px]"
        />
      </div>
    </div>
  );
};

export default PasswordPage;
