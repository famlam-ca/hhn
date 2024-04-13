"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Wrapper } from "@/components/wrapper";
import { resetPassword } from "@/lib/services/user-service";
import { ResetPasswordSchemaStep2 } from "@/types/user-schema";

export const ResetPassword = () => {
  const router = useRouter();

  const email = useSearchParams().get("email");
  const code = useSearchParams().get("code");

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfPassword, setShowConfPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfPassword = () => {
    setShowConfPassword((prev) => !prev);
  };

  const form = useForm<z.infer<typeof ResetPasswordSchemaStep2>>({
    resolver: zodResolver(ResetPasswordSchemaStep2),
    defaultValues: {
      code: code!,
      logoutFromOtherDevices: true,
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchemaStep2>) => {
    startTransition(() => {
      setOpen(true);
    });
  };

  const onClick = async () => {
    const res = await resetPassword(form.getValues(), email!);
    toast({
      title: res.message,
      description: res.description,
      variant: res?.success ? "default" : "destructive",
    });

    form.reset();

    router.push("/");
  };

  const input_style =
    "block w-full h-10 rounded-md border-0 bg-background/50 py-1.5 shadow-sm ring-1 ring-inset ring-ring placeholder:text-muted focus:bg-background focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6";

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Password</AlertDialogTitle>
            <AlertDialogDescription>
              <Checkbox
                defaultChecked
                onCheckedChange={(value: boolean) => {
                  form.setValue("logoutFromOtherDevices", value, {
                    shouldValidate: true,
                  });
                }}
              >
                Do you want to logout from all other devices?
              </Checkbox>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex w-full justify-between">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <MaxWidthWrapper className="flex min-h-screen w-full items-center justify-center">
        <Wrapper className="relative">
          <div className="mx-auto mb-10 flex flex-col items-center justify-center space-y-4">
            <Link href="/" className="z-40 flex items-center gap-2">
              <Icons.logo className="h-8 w-8 fill-text" />
              <h2 className="text-xl font-bold">
                H<span className="text-primary">HN</span>
              </h2>
            </Link>
            <h1 className="text-center text-3xl font-bold leading-9 tracking-tight md:text-4xl lg:text-5xl">
              Reset Password
            </h1>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input
                          required
                          disabled
                          type="text"
                          placeholder="Paste reset password code here."
                          {...field}
                          className={`${input_style}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>New Password*</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="********"
                              {...field}
                              className={`${input_style}`}
                            />
                            <button
                              onClick={togglePassword}
                              type="button"
                              tabIndex={-1}
                              className="absolute right-2 top-[25%]"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPasswordConfirm"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Confirm New Password*</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <input
                              type={showConfPassword ? "text" : "password"}
                              placeholder="********"
                              {...field}
                              className={`${input_style}`}
                            />
                            <button
                              onClick={toggleConfPassword}
                              type="button"
                              tabIndex={-1}
                              className="absolute right-2 top-[25%]"
                            >
                              {showConfPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full uppercase shadow-md"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      <p>Loading...</p>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </Wrapper>
      </MaxWidthWrapper>
    </>
  );
};
