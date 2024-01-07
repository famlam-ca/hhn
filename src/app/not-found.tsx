import Link from "next/link";

import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const NotFoundPage = () => {
  return (
    <MaxWidthWrapper className="flex h-full items-center justify-center">
      <div className="flex h-full flex-col items-center justify-center space-y-4 text-text">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          4<span className="text-primary">0</span>4
        </h1>
        <p className="text-lg text-muted-foreground">
          We couldn&apos;t find the page you were looking for.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default NotFoundPage;
