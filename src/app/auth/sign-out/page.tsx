"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Wrapper } from "@/components/wrapper";
import { useEffect } from "react";

const SignOutPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      signOut({ callbackUrl: "/" });
    } else {
      toast({
        title: "Something went wrong!",
        description:
          "Please try again later, or contact support if the issue persists.",
        variant: "destructive",
        action: (
          <Button variant="outline" className="text-text" asChild>
            <Link href="/support">Support</Link>
          </Button>
        ),
      });
      router.push("/");
    }
  });

  return (
    <MaxWidthWrapper className="flex h-full w-full items-center justify-center">
      <Wrapper className="flex flex-col items-center justify-center space-y-4 text-lg">
        <Loader2 className="h-10 w-10 animate-spin" />
        <div className="text-center">
          <p>Please wait!</p>
          <p>You are being signed out...</p>
        </div>
      </Wrapper>
    </MaxWidthWrapper>
  );
};

export default SignOutPage;
