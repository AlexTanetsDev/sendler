import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      balance: number;
       email: string;
       exp: number;
       iat: number;
       jti: string;
       tel: string;
       user_active: boolean;
       user_create_date: string;
       user_id: number;
       user_login: string;
       user_name: string;
       user_role: string;
   }
  }
}