import { NextRequest, NextResponse } from "next/server";

// Example of default export
export default function middleware(request: NextRequest) {
  // if (request.cookies.get("pw")?.value !== process.env.NEXT_PUBLIC_PW) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // } else {
  return NextResponse.next();
  // }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
