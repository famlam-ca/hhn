"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { resendVerificationEmail } from "@/lib/services/auth-service";
import { isEmailVerified } from "@/lib/services/user-service";

interface VerifyEmailProps {
  email: string;
}

export const VerifyEmail = ({ email }: VerifyEmailProps) => {
  const router = useRouter();

  if (!email) {
    redirect("/");
  }

  useEffect(() => {
    const verifiedEmail = async () => {
      const res = await isEmailVerified(email);
      if (res.success) {
        toast({
          title: res.success,
        });

        router.push("/");
      }
    };

    verifiedEmail();
  }, [email]);

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    });

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (count === 0) {
      stopCountdown(), resetCountdown();
    }
  }, [count]);

  const onResendVerificationEmail = async () => {
    const res = await resendVerificationEmail(email);
    if (res.error) {
      toast({
        title: res.error,
        variant: "destructive",
      });
    } else if (res.success) {
      toast({
        title: res.success,
        variant: "default",
      });
      startCountdown();
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <p className="text-sm">Didn&apos;t receive an email?</p>
      <div>
        <Button
          disabled={count > 0 && count < 60}
          onClick={() => onResendVerificationEmail()}
          variant="link"
          className="px-0 text-zinc-200"
        >
          Resend verification email {count > 0 && count < 60 && `in ${count}s`}
        </Button>
      </div>
    </div>
  );
};
