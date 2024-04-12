"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { toast } from "@/components/ui/use-toast";
import { Wrapper } from "@/components/wrapper";
import { signOut } from "@/lib/services/auth-service";
import { useSession } from "@/providers/session-provider";

const SignOutPage = () => {
  const router = useRouter();
  const { session } = useSession();

  if (!session) {
    router.back();
  }

  useEffect(() => {
    signOut();
  }, []);

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
