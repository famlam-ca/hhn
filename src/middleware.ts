export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/uploadthing", "/dashboard/:path*", "/account/:path*"],
};
