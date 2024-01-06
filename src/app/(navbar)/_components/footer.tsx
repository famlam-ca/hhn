import Link from "next/link";

import MaxWidthWrapper from "@/components/max-width-wrapper";

const style =
  "relative tracking-wide after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition after:content-[''] hover:after:origin-bottom-left hover:after:scale-100";

const Footer = () => {
  return (
    <footer className="relative bottom-0 w-full border-t-2 border-border bg-background/80">
      <MaxWidthWrapper className="h-20 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center text-sm sm:text-center">
          <span>@ 2023&nbsp;</span>
          <Link
            href="/"
            className="text-primary underline-offset-2 hover:underline"
          >
            HHN
          </Link>
          <span>™. All rights reserved.</span>
        </div>

        <ul className="mt-3 flex flex-wrap items-center gap-4 text-sm font-medium sm:mt-0 sm:gap-6">
          <li>
            <Link href="/about" className={`${style}`}>
              About
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/SlickYeet/famlam"
              target="_blank"
              className={`${style}`}
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link href="/projects" className={`${style}`}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/docs" className={`${style}`}>
              Docs
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`${style}`}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/terms" className={`${style}`}>
              Terms
            </Link>
          </li>
        </ul>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
