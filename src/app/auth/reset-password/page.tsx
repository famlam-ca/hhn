import { redirect } from "next/navigation";

import { ResetPassword } from "@/components/password/reset";
import { validateSession } from "@/lib/lucia";
import { validateResetPasswordCode } from "@/lib/services/user-service";

interface SendResetPasswordEmailPageProps {
  searchParams: {
    code: string;
    email: string;
  };
}

const SendResetPasswordEmailPage = async ({
  searchParams: { code, email },
}: SendResetPasswordEmailPageProps) => {
  const { session } = await validateSession();

  if (session || !code || !email) {
    return redirect("/");
  }

  const isCodeValid = await validateResetPasswordCode(code, email);
  if (!isCodeValid) {
    return redirect("/");
  }

  return <ResetPassword />;
};

export default SendResetPasswordEmailPage;
