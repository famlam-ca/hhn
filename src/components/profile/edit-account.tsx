"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
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
import { updateUser, validatePassword } from "@/server/user";
import { CustomUser } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";

type Role = "admin" | "superuser" | "user";

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

  const schema = z
    .object({
      first_name: z
        .string()
        .refine(
          (v) => /^[A-Za-z]*$/i.test(v),
          "First Name may only contain letters",
        )
        .optional(),
      last_name: z
        .string()
        .refine(
          (v) => /^[A-Za-z]*$/i.test(v),
          "Last Name may only contain letters",
        )
        .optional(),
      oldPassword: z
        .string()
        .refine(
          async (v) => {
            if (v) {
              const isValid = await validatePassword(user.id, v);
              return isValid;
            }
            return true;
          },
          { message: "Old password is incorrect." },
        )
        .optional(),
      newPassword: z
        .string()
        .refine(
          (v) => (v ? /.{8,}/.test(v) : true),
          "Password must be at least 8 characters long",
        )
        .refine(
          (v) =>
            v ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/.test(v) : true,
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        )
        .optional(),
      role: z.enum(["user", "superuser", "admin"]).optional(),
    })
    .refine(
      (data) => {
        if (data.oldPassword === data.newPassword && data.oldPassword) {
          return false;
        }
        return true;
      },
      {
        message: "New passwords cannot be the same as old password.",
        path: ["newPassword"],
      },
    )
    .refine(
      (data) => {
        if (data.oldPassword && !data.newPassword) {
          return false;
        }
        return true;
      },
      {
        message: "New password is required to change your password.",
        path: ["newPassword"],
      },
    );

  const defaultValues = {
    first_name: user.first_name as string,
    last_name: user.last_name as string,
    oldPassword: "",
    newPassword: "",
    role: user.role as Role,
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    // console.log("Form values:", values); // debug

    const allValuesUnchanged = Object.entries(values).every(
      ([key, value]) =>
        defaultValues[key as keyof typeof defaultValues] === value,
    );

    if (allValuesUnchanged) {
      toast({
        title: "No changes have been submitted.",
        description: "Becuase no changes have been made.",
      });
      return;
    }

    startTransition(() => {
      updateUser({
        id: user.id,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.newPassword,
        role: values.role,
      })
        .then(() => {
          setShowOldPassword(false);
          setShowNewPassword(false);
          // TODO: Dynamically render updated info
          toast({ title: "Account updated" });
        })
        .catch(() => {
          toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        });

      if (
        values.first_name !== user.first_name ||
        values.last_name !== user.last_name ||
        values.newPassword
      ) {
        if (self) {
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
                      <FormDescription>
                        Your old password is required to change your password.
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
