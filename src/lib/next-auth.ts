import { randomBytes, randomUUID } from "crypto";

import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { v4 as uuidv4 } from "uuid";

if (
  !process.env.KAKAO_CLIENT_ID ||
  !process.env.KAKAO_CLIENT_SECRET ||
  !process.env.NEXTAUTH_SECRET
) {
  console.error("환경 변수가 설정되지 않았습니다.");
  process.exit(1);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    // Uncomment if using credentials provider
    // CredentialsProvider({
    //   name: "Credentials",
    //   id: "credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const existUser = await prisma.user.findUnique({
    //       where: {
    //         email: credentials?.email,
    //       },
    //     });
    //     if (!existUser) throw new Error("해당 이메일로 가입한 적이 없습니다.");

    //     if (existUser.socialLogins.length > 0)
    //       throw new Error("소셜 로그인으로 가입한 회원입니다.");

    //     const passwordMatch = await bcrypt.compare(
    //       credentials!.password,
    //       existUser.password
    //     );

    //     if (!passwordMatch) throw new Error("비밀번호 오류 입니다.");

    //     return existUser as any;
    //   },
    // }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      try {
        if (account?.provider === "kakao") {
          if (!profile || !profile.kakao_account.email) {
            console.error("Kakao 프로필 또는 이메일이 없습니다.");
            return false;
          }

          const email = profile.kakao_account.email;

          const db_user = await prisma.user.findUnique({
            where: { email },
            include: { socialLogins: true }
          });

          if (db_user) {
            const socialLogin = db_user.socialLogins.find(
              (login) => login.provider === "kakao" && login.providerId === profile.id.toString()
            );

            if (!socialLogin) {
              await prisma.socialLogin.create({
                data: {
                  provider: "kakao",
                  providerId: profile.id.toString(), // 숫자를 문자열로 변환
                  userId: db_user.id,
                },
              });
            }

            user.id = db_user.id;
            user.profileImageUrl = db_user.profileImageUrl ?? null; // null로 처리
            return true;
          } else {
            const newUser = await prisma.user.create({
              data: {
                email,
                name: profile.properties.nickname,
                password: null,
                profileImageUrl: profile.properties?.profile_image || null, // null로 처리
                socialLogins: {
                  create: {
                    provider: "kakao",
                    providerId: profile.id.toString(), // 숫자를 문자열로 변환
                  },
                },
              },
            });

            user.id = newUser.id;
            user.profileImageUrl = newUser.profileImageUrl ?? null; // null로 처리
            return true;
          }
        }
        return true;
      } catch (error) {
        console.error("로그인 도중 에러가 발생했습니다: " + error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profileImageUrl = user.profileImageUrl ?? null; // null로 처리
        token.provider = user.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.profileImageUrl as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 사용자가 로그인한 후 특정 URL로 리디렉션하도록 설정
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/`;
      }
      // 상대 경로를 지원
      else if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
};
