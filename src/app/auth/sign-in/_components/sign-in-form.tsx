"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useCountdown } from "usehooks-ts";
import { z } from "zod";

import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { Wrapper } from "@/components/wrapper";
import { signIn } from "@/lib/services/auth-service";
import { resendVerificationEmail } from "@/lib/services/email-service";
import { SignInSchema } from "@/types/auth-schema";

export const SignInForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [showResendVerificationEmail, setShowResendVerificationEmail] =
    useState<boolean>(false);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    });

  useEffect(() => {
    if (count === 0) {
      stopCountdown(), resetCountdown();
    }
  }, [count]);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    startTransition(async () => {
      const res = await signIn(values);
      if (!res.success) {
        toast({
          title: res.message,
          variant: "destructive",
        });
      } else if (res.success) {
        router.push(callbackUrl);
      }

      if (res?.key === "email_not_verified") {
        setShowResendVerificationEmail(true);
      }
    });
  };

  const onResendVerificationEmail = async () => {
    const res = await resendVerificationEmail(form.getValues("email"));
    toast({
      title: res.message,
      variant: res.success ? "default" : "destructive",
    });

    if (res.success) {
      startCountdown();
    }
  };

  const input_style =
    "block w-full h-10 rounded-md border-0 bg-background/50 py-1.5 shadow-sm ring-1 ring-inset ring-ring placeholder:text-muted focus:bg-background focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6";

  return (
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
            Sign In
          </h1>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="email"
                        placeholder="example@domain.ca"
                        {...field}
                        className={`${input_style}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <input
                          required
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
                    <FormDescription className="text-right">
                      Forgot your password?{" "}
                      <Link
                        href="/auth/reset-password/request"
                        className="font-semibold leading-6 text-primary underline-offset-2 hover:underline"
                      >
                        Reset password
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <p className="mt-10 text-center text-sm text-muted">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold leading-6 text-primary underline-offset-2 hover:underline"
            >
              Sign Up!
            </Link>
          </p>

          {showResendVerificationEmail && (
            <p className="mt-10 text-center text-sm text-muted">
              Didn&apos;t receive an email?{" "}
              <Button
                disabled={count > 0 && count < 60}
                onClick={onResendVerificationEmail}
                variant="link"
                className="px-0"
              >
                Resend verification email{" "}
                {count > 0 && count < 60 && `in ${count}s`}
              </Button>
            </p>
          )}
        </div>
      </Wrapper>
    </MaxWidthWrapper>
  );
};

export const SignInSkeleton = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        <div className="h-8 w-8 animate-bounce rounded-full bg-text [animation-delay:-0.3s]" />
        <div className="h-8 w-8 animate-bounce rounded-full bg-text [animation-delay:-0.15s]" />
        <div className="h-8 w-8 animate-bounce rounded-full bg-text" />
      </div>
      <p className="text-4xl">Loading... Please wait!</p>
    </div>
  );
};
