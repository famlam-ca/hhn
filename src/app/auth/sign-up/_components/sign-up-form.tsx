"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { signUp } from "@/lib/services/auth-service";

import { FirstStepSchema, SecondStepSchema } from "@/types/auth-schema";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";

export const SignUpForm = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(1); // change to 1 for prod
  const [firstStepValues, setFirstStepValues] = useState<
    Partial<z.infer<typeof FirstStepSchema>>
  >({});
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfPassword, setShowConfPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfPassword = () => {
    setShowConfPassword((prev) => !prev);
  };

  type FormValues = z.infer<typeof FirstStepSchema> &
    z.infer<typeof SecondStepSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(step === 1 ? FirstStepSchema : SecondStepSchema),
    defaultValues: {
      display_name: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const username = form.watch("display_name").toLowerCase();

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      if (step === 1) {
        values.username = values.display_name.toLowerCase();

        setFirstStepValues(values);
        setStep(2);
      } else {
        const allValues = { ...firstStepValues, ...values };

        const res = await signUp(allValues);
        toast({
          title: res.message,
          description: res.description,
          variant: res.success ? "default" : "destructive",
        });
        if (res.success) {
          router.push("/auth/verify-email?email=" + values.email);
        }
      }
    });
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
            Sign Up
          </h1>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="display_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Display Name"
                            {...field}
                            className={`${input_style}`}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your publicly visible display name. You can
                          change this later.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        type="text"
                        placeholder="username"
                        value={username}
                        className={`${input_style}`}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your unique username. It cannot be changed after
                      you create your account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => setStep(1)}
                      variant="ghost"
                      className="absolute left-10 top-10 text-muted-foreground"
                    >
                      <ChevronLeft className="-ml-2 h-5 w-5" />
                      Back
                    </Button>

                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <input
                              type="text"
                              placeholder="First Name..."
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
                      name="last_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <input
                              type="text"
                              placeholder="Last Name..."
                              {...field}
                              className={`${input_style}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <input
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

                  <div className="flex justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Password*</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <input
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
                      name="passwordConfirm"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Confirm Password*</FormLabel>
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
                </>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full uppercase shadow-md"
              >
                {isPending ? (
                  <div className="flex">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  { step: "Next", 2: "Sign Up" }[step] || "Next"
                )}
              </Button>
            </form>
          </Form>

          <p className="mt-10 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-semibold leading-6 text-primary underline-offset-2 hover:underline"
            >
              Sign In!
            </Link>
          </p>
        </div>
      </Wrapper>
    </MaxWidthWrapper>
  );
};

export const SignUpSkeleton = () => {
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
