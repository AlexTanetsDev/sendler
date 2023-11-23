// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { Role } from "./constants/adminService";

// const SECRET_KEY = process.env.SECRET_KEY;

// export async function middleware(request: NextRequest) {
//   try {
//     const token = request.cookies.get("next-auth.session-token");
// console.log("tokenMidl", token);

//     if (!token?.value || !SECRET_KEY) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     const decodedToken = jwt.verify(token.value, SECRET_KEY!) as JwtPayload;

//     if (!decodedToken) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     if (request.nextUrl.pathname.startsWith("/api/admin/")) {
//       if (decodedToken?.role === Role.ADMIN) {
//         return NextResponse.rewrite(new URL(request.url));
//       }

//       return NextResponse.json(
//         {
//           success: false,
//           message: "Forbidden: no access to request operation",
//         },
//         { status: 403 }
//       );
//     }
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     NextResponse.json(
//       { success: false, message: "Invalid token" },
//       { status: 401 }
//     );
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const resp = NextResponse.next();
//   return resp;
// }

// export const config = {
//   matcher: [
//     // "/((?!login|api|_next/static|_next/image|favicon.ico).*)",

//     "/sms-sender/:path*",
//     // "/create-group/:path*",
//     // "/update-group/:path*",
//     "/sending-history/:path*",
//     // "/api/:path*",
//   ],
// };

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // "/((?!login|api|_next/static|_next/image|favicon.ico).*)",

    // "/sms-sender/:path*",
    "/create-group",
    "/update-group",
    "/dashboard",
    "/sending-history",
    // "/api/:path*",
  ],
};
