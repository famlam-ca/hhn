"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "@/providers/session-provider";

const Unauthorized = () => {
  const router = useRouter();
  const { session } = useSession();

  // Redirect if address was user provided.
  useEffect(() => {
    if (window.document.referrer === "") {
      router.push("/");
    }
  });

  if (!session) {
    router.push("/");
  }

  return (
    <MaxWidthWrapper className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <div className="-m-2 -mt-[3.5rem] rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-ring/10 lg:-m-4 lg:rounded-2xl lg:p-4">
        <div className="rounded-xl bg-background/80 p-10 text-center shadow-xl ring-1 ring-ring/10 sm:p-8 md:p-20">
          <h1 className="text-5xl font-bold">Oops!</h1>
          <p className="my-4 text-lg">
            Looks like you do not have permission to view this page, or are not
            signed in.
          </p>
          <p className="my-4 flex flex-row items-center justify-center text-muted">
            If you thing this is a mistake please contact support!
          </p>

          <div className="my-8 h-px self-center rounded bg-ring/10" />

          <div className="mt-8 flex items-center justify-center gap-2">
            {session ? (
              <>
                <Link
                  href="/"
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Home
                </Link>
                <p className="text-muted">|</p>
                <Link
                  href="/contact/support"
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Contact Support
                </Link>
              </>
            ) : (
              <Link
                href="/auth/sign-in"
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Sign In
                <LogIn className="mr-1 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Unauthorized;
