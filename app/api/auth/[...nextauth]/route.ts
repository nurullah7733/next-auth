import NextAuth, { NextAuthOptions } from "next-auth";
import UserModel from "@/models/userModel/userModel";
import connectDB from "@/utils/db/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any) {
        await connectDB();
        try {
          const exitsUser = await UserModel.findOne({
            email: credentials.email,
          });

          if (exitsUser) {
            if (exitsUser?.provider === "github") {
              return Promise.reject(new Error("Please login using GitHub."));
            }
            if (exitsUser?.provider === "google") {
              return Promise.reject(new Error("Please login using Google."));
            }
            if (exitsUser?.provider === "facebook") {
              return Promise.reject(new Error("Please login using Facebook."));
            }

            const checkPassword = await bcrypt.compare(
              credentials.password,
              exitsUser.password
            );

            if (!checkPassword) {
              return null;
            }

            return exitsUser;
          }
        } catch (error: unknown) {
          console.error(error);
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID ?? "",
      clientSecret: process.env.AUTH_FACEBOOK_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB();

      if (account?.provider === "github") {
        const exitsUser = await UserModel.findOne({ email: user.email });
        if (!exitsUser) {
          await UserModel.create({
            email: user?.email,
            name: user?.name,
            image: user?.image,
            provider: account?.provider,
          });
          return true;
        }
        return true;
      }
      if (account?.provider === "google") {
        const exitsUser = await UserModel.findOne({ email: user.email });
        if (!exitsUser) {
          await UserModel.create({
            email: user?.email,
            name: user?.name,
            image: user?.image,
            provider: account?.provider,
          });
          return true;
        }
        return true;
      }
      if (account?.provider === "facebook") {
        const exitsUser = await UserModel.findOne({ email: user.email });
        if (!exitsUser) {
          await UserModel.create({
            email: user?.email,
            name: user?.name,
            image: user?.image,
            provider: account?.provider,
          });
          return true;
        }
        return true;
      }
      return true;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
