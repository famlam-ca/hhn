import { VerifyEmail } from "@/components/verify-email";

interface VerifyEmailPageProps {
  searchParams: {
    email: string;
  };
}

const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 md:h-screen">
      <a
        href="/"
        className="mb-8 flex items-center justify-center text-2xl font-semibold text-zinc-200 lg:mb-10"
      >
        <img src="/vercel.svg" className="mr-4 h-11" />
      </a>
      <div className="w-full max-w-xl space-y-8 rounded-lg p-6 shadow bg-zinc-800 sm:p-8">
        <h2 className="text-2xl font-bold text-zinc-200">Verify Your Email</h2>
        <div>
          <p>Check your email for a verification link.</p>
          <p>You can close this window after verifing your email.</p>
        </div>
        <VerifyEmail email={searchParams.email} />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
