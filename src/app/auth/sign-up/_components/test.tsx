"use client";

import { useEffect } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TypeOf, z } from "zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { trpc } from "@/app/_trpc/client";

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters").max(100),
    full_name: z.string().min(1, "Full name is required").max(100),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Email Address is invalid"),
    password: z
      .string()
      .min(1, "Password is required!")
      .min(10, "Password must be at least 10 characters!")
      .max(32, "Password must be shorter than 32 characters."),
    passwordConfirm: z.string().min(1, "Please confirm your password!"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export type RegisterInput = TypeOf<typeof registerSchema>;

const Test = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const { toast } = useToast();

  if (user) {
    redirect("/");
  }

  const { mutate: createUser, isLoading } = trpc.createUser.useMutation({
    onSuccess: (data) => {
      toast({
        title: `Welcome ${data?.data.user.full_name}`,
        description: "Enjoy your stay!",
      });
      router.push("/auth/sign-in");
    },
    onError: (err) => {
      if (err) {
        toast({
          title: "There was a problem creating your account.",
          description:
            "An account with this email already exists - Want to sign in instead?",
          variant: "destructive",
          action: (
            <Link
              href="/auth/sign-in"
              className={buttonVariants({
                variant: "outline",
                className: "bg-transparent text-text",
              })}
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Link>
          ),
        });
      }
    },
  });

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    createUser(values);
  };

  const input_style =
    "block w-full h-10 rounded-md border-0 bg-background/50 py-1.5 shadow-sm ring-1 ring-inset ring-ring placeholder:text-muted focus:bg-background focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6";

  return (
    <div>
      <div className="mx-auto mb-10 flex flex-col items-center justify-center space-y-4">
        <Link href="/">
          <Icons.logo className="h-8 w-8 fill-text" />
        </Link>
        <h1 className="text-center text-3xl font-bold leading-9 tracking-tight md:text-4xl lg:text-5xl">
          Sign Up
        </h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium leading-6">
                  Username*
                </label>
                <div className="mt-2">
                  <input
                    required
                    name="username"
                    type="text"
                    placeholder="Username..."
                    className={`${input_style}`}
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium leading-6">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    required
                    name="full_name"
                    type="text"
                    placeholder="Full Name..."
                    className={`${input_style}`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6">
                Email*
              </label>
              <div className="mt-2">
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email..."
                  className={`${input_style}`}
                />
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium leading-6">
                  Password*
                </label>
                <div className="mt-2">
                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Password..."
                    className={`${input_style}`}
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium leading-6">
                  Confirm Password*
                </label>
                <div className="mt-2">
                  <input
                    required
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password..."
                    className={`${input_style}`}
                  />
                </div>
              </div>
            </div>

            <div>
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
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>

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
    </div>
  );
};

export default Test;
