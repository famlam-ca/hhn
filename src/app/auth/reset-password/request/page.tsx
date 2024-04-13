import { redirect } from "next/navigation";

import { SendResetPasswordEmail } from "@/components/password/send";
import { validateSession } from "@/lib/lucia";

const SendResetPasswordEmailPage = async () => {
  const { session } = await validateSession();

  if (session) {
    return redirect("/");
  }

  return <SendResetPasswordEmail />;
};

export default SendResetPasswordEmailPage;
