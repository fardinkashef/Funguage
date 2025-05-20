import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./lib/server-actions/users";
import { loginFormSchema } from "./lib/zodSchemas";
import { ZodError } from "zod";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // Validate user input data
          const { email, password } = await loginFormSchema.parseAsync(
            credentials
          );
          // logic to verify if the user exists
          const user = await getUser(email, password);
          if (!user) {
            console.log("Invalid credentials");
            return null;
          }

          // return the user data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token._id = user._id;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user._id = token._id as string;
      session.user.username = token.username as string;
      return session;
    },
  },
  // An important question: I'm not using middleware to protect pages. On each page I want to protect, I check the user session and redirect the user to login page if there is no session, so the question is, what is the following line good for? It would be necessary if I used middleware to protect pages and redirect the user automatically, but when I'm doing it explicitly, I don't know if I need to use the following line
  pages: { signIn: "/login" },
});
