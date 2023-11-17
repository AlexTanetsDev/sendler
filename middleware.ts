import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "./constants/adminService";

const SECRET_KEY = process.env.SECRET_KEY;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  try {
    if (!token || !SECRET_KEY) {
      NextResponse.json(
        { success: false, message: "Authorization token missing" },
        { status: 401 }
      );

      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decodedToken = jwt.verify(token.value, SECRET_KEY) as JwtPayload;

    if (!decodedToken) {
      NextResponse.json(
        { success: false, message: "Error verifying token" },
        { status: 401 }
      );

      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/api/admin/")) {
      if (decodedToken?.role === Role.ADMIN) {
        return NextResponse.rewrite(new URL(request.url));
      }
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("next");
  const resp = NextResponse.next();
  return resp;
}

export const config = {
  matcher: [
    // "/api/:path*",
    "/((?!api|sending-history|login|_next/static|_next/image|favicon.ico).*)",
    // "/((?!^/$|^/login$).*)",
  ],
};
