"use client";

import { User, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QuickActionsCardProps {
  onEditProfile: () => void;
  onSecuritySettings: () => void;
  onEmailPreferences: () => void;
}

export function QuickActionsCard({
  onEditProfile,
  onSecuritySettings,
  onEmailPreferences,
}: QuickActionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            onClick={onEditProfile}
          >
            <User className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="font-medium">Edit Profile</div>
              <div className="text-xs text-muted-foreground">
                Update your information
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            onClick={onSecuritySettings}
          >
            <Shield className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="font-medium">Security Settings</div>
              <div className="text-xs text-muted-foreground">
                Manage security options
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            onClick={onEmailPreferences}
          >
            <Mail className="h-4 w-4 mr-2" />
            <div className="text-left">
              <div className="font-medium">Email Preferences</div>
              <div className="text-xs text-muted-foreground">
                Configure notifications
              </div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
