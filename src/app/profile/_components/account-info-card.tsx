"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AccountInfoCardUser {
  name: string | null;
  email: string | null;
  emailVerified: boolean;
}

interface AccountInfoCardProps {
  user: AccountInfoCardUser;
}

export function AccountInfoCard({ user }: AccountInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Your account details and settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Full Name
            </label>
            <div className="p-3 border rounded-md bg-muted/10">
              {user.name || "Not provided"}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Email Address
            </label>
            <div className="p-3 border rounded-md bg-muted/10 flex items-center justify-between">
              <span>{user.email}</span>
              {user.emailVerified && (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">Email Verification</p>
                <p className="text-sm text-muted-foreground">
                  Email address verification status
                </p>
              </div>
              <Badge variant={user.emailVerified ? "default" : "secondary"}>
                {user.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">Account Type</p>
                <p className="text-sm text-muted-foreground">
                  Your account access level
                </p>
              </div>
              <Badge variant="outline">Standard</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
