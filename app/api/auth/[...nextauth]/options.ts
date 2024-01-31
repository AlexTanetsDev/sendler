import axios, { AxiosResponse } from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: {
          label: 'Username:',
          type: 'text',
          placeholder: 'Enter your user name',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        const BASE_URL = process.env.NEXT_APP_URL
        try {
          const response: AxiosResponse = await axios.post(`${BASE_URL}/api/users/login`, credentials, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const user = response.data;
          console.log('user.rest', user.rest);

          return user.rest;
        } catch (error) {
          console.error('Błąd podczas autoryzacji:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET_KEY,
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};
