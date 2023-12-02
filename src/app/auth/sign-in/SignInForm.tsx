"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ArrowRight, Loader2 } from "lucide-react";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/use-toast";

const SignInForm = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (user) {
    redirect("/");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setIsLoading(false);

      if (res?.error) {
        toast({
          title: "Invalid email or password.",
          description:
            "The email or password provided is invalid of does not exist!",
          variant: "destructive",
        });
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setIsLoading(false);
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
          Sign In
        </h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6">Email</label>
            <div className="mt-2">
              <input
                required
                type="email"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
                className={`${input_style}`}
              />
            </div>
          </div>

          <div>
            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full uppercase shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <p>Loading...</p>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-muted">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/auth/sign-up"
            className="font-semibold leading-6 text-primary underline-offset-2 hover:underline"
          >
            Sign Up!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
