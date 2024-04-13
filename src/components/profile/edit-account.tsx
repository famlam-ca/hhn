"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { changePassword, updateUser } from "@/lib/services/user-service";
import { CustomUser } from "@/types";
import { EditAccountSchema } from "@/types/user-schema";

interface ProfileProps {
  user: CustomUser;
  self?: CustomUser;
}

export const EditAccount = ({ user, self }: ProfileProps) => {
  const pathname = usePathname();

  const [role, setRole] = useState<string>();

  const [isPending, startTransition] = useTransition();
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const toggleOldPassword = () => {
    setShowOldPassword((prev) => !prev);
  };
  const toggleNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const defaultValues = {
    first_name: user.first_name as string,
    last_name: user.last_name as string,
    oldPassword: "",
    newPassword: "",
    logoutFromOtherDevices: false,
    role: user.role,
  };

  const form = useForm<z.infer<typeof EditAccountSchema>>({
    resolver: zodResolver(EditAccountSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof EditAccountSchema>) => {
    const allValuesUnchanged = Object.entries(values).every(
      ([key, value]) =>
        defaultValues[key as keyof typeof defaultValues] === value,
    );

    if (allValuesUnchanged) {
      toast({
        title: "No changes have been submitted.",
      });
      return;
    }

    startTransition(async () => {
      if (!values.newPassword && !values.oldPassword) {
        const res = await updateUser({
          id: user.id,
          first_name: values.first_name,
          last_name: values.last_name,
          role: values.role,
        });
        if (!res.success) {
          toast({
            title: res.message,
            description: res.description,
            variant: "destructive",
          });
        }

        const updatedFields = [];
        if (values.first_name !== user.first_name) {
          updatedFields.push("First name");
        }
        if (values.last_name !== user.last_name) {
          updatedFields.push("Last name");
        }
        if (values.role !== user.role) {
          updatedFields.push("Role");
        }

        let updatedFieldsString = "";
        if (updatedFields.length === 1) {
          updatedFieldsString = updatedFields[0];
        } else if (
          updatedFields.length === 2 &&
          updatedFields.includes("First name") &&
          updatedFields.includes("Last name") &&
          updatedFields.includes("Role")
        ) {
          updatedFieldsString = "First and Last name";
        } else if (updatedFields.length === 2) {
          updatedFieldsString = updatedFields.join(" and ");
        } else if (updatedFields.length > 2) {
          updatedFieldsString = `${updatedFields.slice(0, -1).join(", ")} and ${updatedFields[updatedFields.length - 1]}`;
        }

        toast({ title: `${updatedFieldsString} updated.` });
      } else if (values.oldPassword && values.newPassword) {
        const res = await changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          logoutFromOtherDevices: values.logoutFromOtherDevices,
        });
        toast({
          title: res.message,
          description: res.description,
          variant: res.success ? "default" : "destructive",
        });

        setShowOldPassword(false);
        setShowNewPassword(false);
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
              Make changes to your account here. Click save when you&apos;re
              done.
            </span>
          ) : (
            <span>Make changes to {user.username}&apos;s account here.</span>
          )}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input disabled defaultValue={user.username} />
              <p className="text-sm text-muted-foreground">
                Your username cannot be changed after you have created your
                account.
              </p>
            </div>

            <div className="flex items-center justify-between gap-x-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between gap-x-6">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showOldPassword ? "text" : "password"}
                            placeholder="Old Password"
                            {...field}
                          />
                          <button
                            onClick={toggleOldPassword}
                            type="button"
                            tabIndex={-1}
                            className="absolute right-2 top-[25%]"
                          >
                            {showOldPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormDescription className="flex items-center gap-x-1">
                        <Checkbox
                          tabIndex={-1}
                          onCheckedChange={(v: boolean) => {
                            form.setValue("logoutFromOtherDevices", v, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          Do you want to logout from other devices?
                        </Checkbox>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="New Password"
                            {...field}
                          />
                          <button
                            onClick={toggleNewPassword}
                            type="button"
                            tabIndex={-1}
                            className="absolute right-2 top-[25%]"
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        You&apos;ll be logged out once you hit save.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      disabled={
                        (self?.role !== "admin" && user.role !== "admin") ||
                        (isPending && user.role !== "admin")
                      }
                      value={role}
                      onValueChange={(value) => {
                        setRole(value);
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="superuser">Super User</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col items-end">
            <Button disabled={isPending} type="submit" variant="outline">
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
