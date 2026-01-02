import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/features/auth/components/profile-form";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { getUserStats } from "@/features/auth/queries/get-user-stats";
import { AccountTabs } from "../_navigation/tabs";

const ProfilePage = async () => {
  const { user } = await getAuthOrRedirect();
  const stats = await getUserStats();

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Profile"
        description="Manage your account information"
        tabs={<AccountTabs />}
      />

      <div className="flex w-full max-w-[420px] flex-col gap-y-4 self-center">
        <CardCompact
          title="Personal Information"
          description="Update your username and email address"
          content={<ProfileForm user={user} />}
        />

        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tickets created</span>
              <span className="font-medium">{stats.ticketCount}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Comments posted</span>
              <span className="font-medium">{stats.commentCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
