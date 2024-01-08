"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";

interface SignInFormProps {
  callbackUrl: string;
}

const SignInForm = ({ callbackUrl }: SignInFormProps) => {
  const { data: session } = useSession();
  const user = session?.user;

  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (user) {
    redirect("/");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        callbackUrl: callbackUrl,
        email,
        password,
      });

      revalidatePath(callbackUrl);

      setIsLoading(false);

      if (res?.error) {
        toast({
          title: "Invalid email or password.",
          description:
            "The email or password provided is invalid of does not exist!",
          variant: "destructive",
        });
        revalidatePath("/");
        redirect("/");
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
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="relative mt-2">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
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

          <div>
            <Button
              type="submit"
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
