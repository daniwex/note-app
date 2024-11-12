import { connectMongoose } from "@/app/db/database";
import user from "@/app/db/schema/user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createSession } from "@/app/lib/session";
import GoogleProvider from "next-auth/providers/google";

const bcrypt = require('bcryptjs')

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectMongoose();
        const u = await user.findOne({ email: credentials.email });
        if (!u) {
          // Return a more specific error message if user is not found
          return Promise.reject(new Error("No user found with this email")); 
        }
    
        const isValid = await bcrypt.compare(credentials.password, u.password);
        if (!isValid) {
          // Return a more specific error message for incorrect password
          return Promise.reject(new Error("Invalid password"));
        }
        await createSession(u._id)
       return u;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    },
  },
};

const authHandler = NextAuth(options);

export default authHandler;


export const handlers = {
  GET: authHandler,
  POST: authHandler,
};

