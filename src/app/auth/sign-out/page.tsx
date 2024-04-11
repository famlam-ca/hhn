"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Wrapper } from "@/components/wrapper";
import { signOut } from "@/lib/services/auth-service";
import { useSession } from "@/providers/session-provider";

const SignOutPage = () => {
  const searchPrams = useSearchParams();
  const callbackUrl = (searchPrams.get("callbackUrl") || "/").startsWith("/u/")
    ? "/"
    : searchPrams.get("callbackUrl") || "/";

  const router = useRouter();
  const { session } = useSession();

  if (!session) {
    router.back();
  }

  useEffect(() => {
    (async () => {
      const res = await signOut({ callbackUrl });
      if (res) {
        if (res.error) {
          toast({
            title: res.error,
            description:
              "Please try again later, or contact support if the issue persists.",
            variant: "destructive",
            action: (
              <Button variant="outline" className="text-text" asChild>
                <Link href="/support">Support</Link>
              </Button>
            ),
          });
        } else if (res.success) {
          toast({
            title: res.success,
          });
        }
      }
    })();
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
