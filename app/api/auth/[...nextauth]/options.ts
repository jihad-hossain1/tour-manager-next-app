import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.models";
import Client from "@/models/client.models";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import mongooseConnection from "@/config/connectDB";

export enum Role {
  Admin = "admin",
  User = "user",
  Client = "client",
}

declare module "next-auth" {
  interface User {
    role: Role;
    id: string;
    clientId: string;
    adminId: string;
    type: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
      email: string;
      name: string;
      password: string;
      id: string;
      clientId: string;
      adminId: string;
      type: string
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    clientId?: string;
    adminId?: string;
    type: string;
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "your-Email",
        },
        uemail: {
          label: "email number:",
          type: "text",
          placeholder: "your email numer",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
        for: {
          label: "for",
          type: "text",
          value: "user",
        },
      },

      async authorize(
        credentials: Record<"email" | "password" | "uemail" | "for", string>
      ) {
        if (!credentials) return null;

        const { email, password, uemail } = credentials;

        await mongooseConnection();

        if (credentials.for == "user") {
          const user = await User.findOne({
            email: uemail,
          });

          if (!user) {
            return Promise.reject(new Error("email Number are not valid"));
          }
          if (user.verifyed === 'inactive') {
            return Promise.reject(new Error("email Number are not verifyed"));
          }

          const validPassword = await bcrypt.compare(password, user?.password);

          if (!validPassword) {
            return Promise.reject(new Error("Invalid password "));
          }

          return Promise.resolve({
            email: user?.email,
            name: user?.name,
            role: user?.role,
            id: user?._id,
            mobile: user?.mobile,
          });
        }

        try {
          const foundClient = await Client.findOne({
            email: email,
          });

          const user = {
            email: foundClient?.email,
            name: foundClient?.name,
            role: foundClient?.role,
            clientId: foundClient?._id,
            type: foundClient?.clientType
          };
          if (!foundClient)
            return Promise.reject(new Error("Email are not valid"));
          if (foundClient) {
            const validPassword = await bcrypt.compare(
              password,
              foundClient?.password
            );

            if (!validPassword) {
              return Promise.reject(new Error("Password Invalid"));
            }

            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const role = "role" in user ? user.role : "defaultRole";
        token.role = role;
        token.id = user?.id;
        token.adminId = user.adminId;
        token.clientId = user.clientId;
        token.type = user.type
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        const role =
          "role" in token ? (token.role as Role) : ("defaultRole" as Role);
        session.user.role = role;
        session.user.id = token?.id;
        session.user.clientId = token?.clientId;
        session.user.adminId = token?.adminId;
        session.user.type = token?.type
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: ["/admin/login", "/login"],
  // },
};
