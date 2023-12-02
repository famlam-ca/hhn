"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, LogIn } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";

const SignUpForm = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (user) {
    redirect("/");
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (!res.ok) {
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
    } else {
      router.push("/auth/sign-in");
    }
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6">
              First Name
            </label>
            <div className="mt-2">
              <input
                required
                name="first_name"
                type="text"
                placeholder="First Name..."
                className={`${input_style}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6">
              Last Name
            </label>
            <div className="mt-2">
              <input
                required
                name="last_name"
                type="text"
                placeholder="Last Name..."
                className={`${input_style}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6">Email</label>
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

          <div>
            <label className="block text-sm font-medium leading-6">
              Password
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
  );
};

export default SignUpForm;
