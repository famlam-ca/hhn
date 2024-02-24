"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { Wrapper } from "@/components/wrapper";

export const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [step, setstep] = useState<number>(1);
  const [firstStepValues, setFirstStepValues] = useState<
    Partial<z.infer<typeof firstStepSchema>>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfPassword, setShowConfPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfPassword = () => {
    setShowConfPassword((prev) => !prev);
  };

  const firstStepSchema = z.object({
    display_name: z
      .string()
      .refine(
        (v) => /.{8,}/.test(v),
        "Display name must be at least 8 characters long",
      )
      .refine(
        (v) => /^[a-zA-Z0-9_.]+$/i.test(v),
        "Display Name must contain only letters, numbers, underscores, and periods",
      )
      .refine(
        (v) => /^.{1,20}$/.test(v),
        "Display name must be at most 20 characters long",
      )
      .refine(
        (v) => /^(?!.*[_.]{2,})[^._].*[^._]$/.test(v),
        "Display name cannot contain consecutive, leadning or trailing underscores or periods",
      ),
    username: z.string(),
  });
  const secondStepSchema = z
    .object({
      first_name: z
        .string()
        .transform((v) => v.trim())
        .refine(
          (v) => /^[A-Za-z]*$/i.test(v),
          "First Name may only contain letters",
        )
        .optional(),
      last_name: z
        .string()
        .transform((v) => v.trim())
        .refine(
          (v) => /^[A-Za-z]*$/i.test(v),
          "Last Name may only contain letters",
        )
        .optional(),
      email: z
        .string()
        .email()
        .refine(
          (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(v),
          "Must be a valid email address",
        ),
      password: z
        .string()
        .refine(
          (v) => /.{8,}/.test(v),
          "Password must be at least 8 characters long",
        )
        .refine(
          (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/.test(v),
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        ),
      passwordConfirm: z
        .string()
        .refine(
          (v) => /.{8,}/.test(v),
          "Password must be at least 8 characters long",
        )
        .refine(
          (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/.test(v),
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        ),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match.",
      path: ["passwordConfirm"],
    });

  type FormValues = z.infer<typeof firstStepSchema> &
    z.infer<typeof secondStepSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(step === 1 ? firstStepSchema : secondStepSchema),
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

  const onSubmit = async (values: FormValues) => {
    if (step === 1) {
      values.username = values.display_name.toLowerCase();

      setIsLoading(true);

      setFirstStepValues(values);
      setstep(2);

      setIsLoading(false);
    } else {
      setIsLoading(true);

      const allValues = { ...firstStepValues, ...values };

      const config = {
        method: "post",
        url: "/api/auth/register",
        data: allValues,
      };

      try {
        const res = await axios.request(config);
        // console.log("Res:", { res }); // debug

        if (res.status !== 200) {
          throw new Error("Unexpected status code");
        }

        toast({
          title: "Successfully created your account.",
          description: `Welcome to our humble home network, ${values.display_name}.`,
        });
        setIsLoading(false);
        router.push("/auth/sign-in");
      } catch (error: any) {
        // console.error("Error:", error); // debug

        let errorMessage = "There was a problem creating your account.";

        // console.log("Error Response:", error.response); // debug

        if (error.response && error.response.status === 400) {
          errorMessage = error.response.data;
        } else if (error.response && error.response.status === 500) {
          errorMessage =
            "There was an internal server error. Please try again later.";
        }

        toast({
          title: errorMessage,
          description: "Sign in instead?",
          variant: "destructive",
          action: (
            <Button
              onClick={() => router.push("/auth/sign-in")}
              variant="ghost"
              className="uppercase"
            >
              Sign In
            </Button>
          ),
        });
        setIsLoading(false);
      }
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
                        <FormLabel>Display name*</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Display name"
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
                  <div className="flex justify-between gap-4">
                    <Button
                      onClick={() => setstep(1)}
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
                            placeholder="Email..."
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
                                placeholder="Password..."
                                {...field}
                                className={`${input_style}`}
                              />
                              <button
                                onClick={togglePassword}
                                type="button"
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
                                placeholder="Confirm Password..."
                                {...field}
                                className={`${input_style}`}
                              />
                              <button
                                onClick={toggleConfPassword}
                                type="button"
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
                disabled={isLoading}
                className="w-full uppercase shadow-md"
              >
                {isLoading ? (
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
