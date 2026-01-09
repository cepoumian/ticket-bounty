import { CardCompact } from "@/components/card-compact";
import { PasswordResetForm } from "@/features/password/components/password-reset-form";

type PasswordResetPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

const PasswordResetPage = async ({ params }: PasswordResetPageProps) => {
  const { tokenId } = await params;

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="New Password"
        description="Enter new password for your account"
        content={<PasswordResetForm tokenId={tokenId} />}
        className="animate-fade-in-from-top w-full max-w-[420px]"
      />
    </div>
  );
};

export default PasswordResetPage;
