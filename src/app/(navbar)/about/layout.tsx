import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Wrapper } from "@/components/wrapper"

interface AboutLayoutProps {
  children: React.ReactNode
}

const AboutLayout = ({ children }: AboutLayoutProps) => {
  return (
    <>
      <div className="mt-8 h-48 bg-aboutBanner">
        <div className="flex h-full flex-col items-center justify-center text-center font-bold tracking-widest backdrop-blur-sm">
          <h1 className="text-6xl text-white sm:text-8xl">About</h1>
          <h2>
            A HUMBLE<span className="text-primary"> HOME NETWORK</span>
          </h2>
        </div>
      </div>

      <MaxWidthWrapper className="my-8">
        <Wrapper className="space-y-6">{children}</Wrapper>
      </MaxWidthWrapper>
    </>
  )
}

export default AboutLayout
