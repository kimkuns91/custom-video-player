import "./globals.css";

import Header from "@/components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ModalComponent from "@/components/ModalComponent";
import { Noto_Sans_KR } from "next/font/google";
import RecoilRootWrapper from "@/components/RecoilWrapper";
import SessionProvider from "@/components/SessionProvider";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
  variable: "--noto_sans_kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HamCat Stream",
  description: "최고의 스트리밍 서비스",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={cn(
          "custom-scrollbar",
          "bg-background text-white antialiased",
          noto_sans_kr.variable
        )}
      >
        <SessionProvider session={session}>
          <RecoilRootWrapper>
            <div className="flex min-h-screen w-full flex-col">
              <Header />
              {children}
              <ModalComponent />
            </div>
          </RecoilRootWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
