"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { updateUser } from "@/server/user";
import { CustomUser } from "@/types/types";

type Role = "admin" | "superuser" | "user";

interface ProfileProps {
  user: CustomUser;
  self?: CustomUser;
}

export const EditAccount = ({ user, self }: ProfileProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [first_name, setFirst_name] = useState<string>(user.first_name);
  const [last_name, setLast_name] = useState<string>(user.last_name);
  const [email, setEmail] = useState<string>(user.email);
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
        id: user.id,
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
          toast({ title: "Account updated" });
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
        first_name !== user.first_name ||
        last_name !== user.last_name ||
        email !== user.email ||
        newPassword
      ) {
        if (!self) {
          signOut();
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          {pathname !== `/admin/${user.username}/edit` ? (
            <span>
              Make changes to your account here. After saving, you&apos;ll be
              logged out.
            </span>
          ) : (
            <span>Make changes to {user.username}&apos;s account here.</span>
          )}
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
              disabled={
                (self?.role !== "admin" && user.role !== "admin") ||
                (isPending && user.role !== "admin")
              }
              onValueChange={(value) => setValueRole(value)}
              defaultValue={user.role}
            >
              <SelectTrigger>
                <SelectValue placeholder={user.role} />
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
