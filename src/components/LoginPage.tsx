'use client';

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

const LoginPage: React.FC = () => {

  const handleKakaotalkLogin = () => {
    signIn("kakao");
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src={"/images/onboarding.webp"}
        alt="Onboarding"
        layout="fill"
        style={{ objectFit: "cover" }}
        priority
      />
      <Image
        src={"/images/gradation.png"}
        alt="Onboarding"
        layout="fill"
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="absolute top-10 left-10">
        <Image
          src={"/images/LogoBasic.png"}
          alt="Logo"
          width={125}
          height={100}
          priority
        />
      </div>
      <div
        className={cn(
          "absolute w-full max-w-[380px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "flex flex-col items-center justify-center gap-4"
        )}
      >
        <p className="text-center text-white font-semibold text-4xl leading-[3rem]">
          반가워요!
          <br />
          계정을 선택해주세요.
        </p>

        <button className="w-full flex items-center justify-center space-x-3 border border-slate-200 py-4 rounded-md font-semibold text-lg">
          <Image
            src={"/images/LogoBasic.png"}
            alt="Logo"
            width={35}
            height={50}
            priority
          />
          <p>HamCat 아이디로 시작하기</p>
        </button>
        <button
          onClick={handleKakaotalkLogin}
          className="w-full flex items-center justify-center space-x-3 bg-yellow-300 text-black py-4 rounded-md font-semibold text-lg"
        >
          <RiKakaoTalkFill className="text-3xl" />
          <p>카카오로 시작하기</p>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
