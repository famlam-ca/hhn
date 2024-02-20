"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export const SignUpForm = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfPassword, setShowConfPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfPassword = () => {
    setShowConfPassword((prev) => !prev);
  };

  if (user) {
    redirect("/");
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm"),
      }),
    });

    if (!res.ok) {
      toast({
        title: "There was a problem creating your account.",
        description:
          "An account with this email or username already exists - Want to sign in instead?",
        variant: "destructive",
        action: (
          <Link
            href="/auth/sign-in"
            className={buttonVariants({
              variant: "outline",
              className: "bg-transparent text-text",
            })}
          >
            Sign In
          </Link>
        ),
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Successfully created your account.",
        description: "Welcome to our humble home network.",
      });

      setIsLoading(false);
      router.push("/auth/sign-in");
    }
  };

  const input_style =
    "block w-full h-10 rounded-md border-0 bg-background/50 py-1.5 shadow-sm ring-1 ring-inset ring-ring placeholder:text-muted focus:bg-background focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6";

  return (
    <MaxWidthWrapper className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-ring/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="rounded-md bg-background/80 p-2 shadow-2xl ring-1 ring-ring/10 sm:p-8 md:p-20">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-between gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        First Name
                      </label>
                      <div className="mt-2">
                        <input
                          name="first_name"
                          type="text"
                          placeholder="First Name..."
                          className={`${input_style}`}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Last Name
                      </label>
                      <div className="mt-2">
                        <input
                          name="last_name"
                          type="text"
                          placeholder="Last Name..."
                          className={`${input_style}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
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
                      <div className="relative mt-2">
                        <input
                          required
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password..."
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
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium leading-6">
                        Confirm Password*
                      </label>
                      <div className="relative mt-2">
                        <input
                          required
                          name="passwordConfirm"
                          type={showConfPassword ? "text" : "password"}
                          placeholder="Confirm Password..."
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
          </div>
        </div>
      </div>
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
