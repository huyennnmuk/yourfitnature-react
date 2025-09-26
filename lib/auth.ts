import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserForAuth } from "@/lib/roadmap-db"
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("Attempting to authorize user:", credentials?.email);
        if (!credentials) {
          console.log("No credentials provided.");
          return null;
        }

        const user = await getUserForAuth(credentials.email);
        console.log("User from DB:", user);

        if (user && user.password) {
          console.log("Comparing passwords...");
          const isValid = await bcrypt.compare(credentials.password, user.password);
          console.log("Password is valid:", isValid);

          if (isValid) {
            console.log("Authorization successful.");
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }
        
        console.log("Authorization failed.");
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  }
};