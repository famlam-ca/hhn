"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { updateUser } from "@/server/user";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Role = "admin" | "superuser" | "user";

interface AccountCardProps {
  initialFirstName: string;
  initialLastName: string;
  initialEmail: string;
  userRole: string;
}

export const AccountCard = ({
  initialFirstName,
  initialLastName,
  initialEmail,
  userRole,
}: AccountCardProps) => {
  const router = useRouter();

  const [first_name, setFirst_name] = useState<string>(initialFirstName);
  const [last_name, setLast_name] = useState<string>(initialLastName);
  const [email, setEmail] = useState<string>(initialEmail);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [valueRole, setValueRole] = useState<string>();

  const [isPending, startTransition] = useTransition();
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const toggleOldPassword = () => {
    setShowOldPassword((prev) => !prev);
  };

  const toggleNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: newPassword,
        role: valueRole as Role,
      })
        .then(() => {
          setShowOldPassword(false);
          setShowNewPassword(false);
          // TODO: Dynamically render updated info
          toast({ title: "Profile updated" });
          router.refresh();
        })
        .catch(() => {
          toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        });

      if (
        first_name !== initialFirstName ||
        last_name !== initialLastName ||
        email !== initialEmail ||
        newPassword
      ) {
        signOut();
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. After saving, you&apos;ll be logged
          out.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between gap-x-6">
            <div className="w-full space-y-2">
              <Label>First name</Label>
              <Input
                disabled={isPending}
                placeholder="First name"
                onChange={(e) => setFirst_name(e.target.value)}
                value={first_name}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Last name</Label>
              <Input
                disabled={isPending}
                placeholder="Last name"
                onChange={(e) => setLast_name(e.target.value)}
                value={last_name}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              disabled={isPending}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex items-center justify-between gap-x-6">
            <div className="w-full space-y-2">
              <Label>Old Password</Label>
              <div className="relative">
                <Input
                  disabled={isPending}
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                  onClick={toggleOldPassword}
                  type="button"
                  className="absolute right-2 top-[25%]"
                >
                  {showOldPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="w-full space-y-2">
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  disabled={isPending}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={toggleNewPassword}
                  type="button"
                  className="absolute right-2 top-[25%]"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              disabled={isPending || userRole !== "admin"}
              onValueChange={(value) => setValueRole(value)}
              defaultValue={userRole}
            >
              <SelectTrigger>
                <SelectValue placeholder={userRole} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superuser">Super User</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-end">
          <Button disabled={isPending} type="submit" variant="outline">
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
