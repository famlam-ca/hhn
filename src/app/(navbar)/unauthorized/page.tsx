import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/Button";
import { SignIn } from "@/components/auth/Button";
import { LifeBuoy, LogIn } from "lucide-react";

const Unauthorized = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect("/");

  return (
    <MaxWidthWrapper className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <div className="-m-2 -mt-[3.5rem] rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-ring/10 lg:-m-4 lg:rounded-2xl lg:p-4">
        <div className="rounded-xl bg-background/80 p-10 text-center shadow-xl ring-1 ring-ring/10 sm:p-8 md:p-20">
          <h1 className="text-5xl font-bold">Oops!</h1>
          <p className="my-4 text-lg">
            Looks like you you are not signed in, or do not have permission to
            view this page.
          </p>
          <p className="my-4 flex flex-row items-center justify-center text-muted">
            If you thing this is a mistake please contact support!
          </p>

          <div className="my-8 h-px self-center rounded bg-ring/10" />

          <div className="mt-8 flex items-center justify-center gap-2">
            {user ? (
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
                <SignIn
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Contact Support
                </SignIn>
              </>
            ) : (
              <SignIn
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Sign In
                <LogIn className="mr-1 h-5 w-5" />
              </SignIn>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Unauthorized;
