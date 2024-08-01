import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

const Onboarding: React.FC = () => {
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

      <div
        className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "flex flex-col items-center justify-center gap-6"
        )}
      >
        <Image
          src={"/images/LogoBasic.png"}
          alt="Logo"
          width={225}
          height={100}
          priority
        />
        <p className="text-center text-white font-semibold text-5xl leading-[4rem]">
          햄캣 스트리밍에서
          <br />
          드라마, 예능, 영화, 애니메이션까지!
          <br />
          무제한으로 스트리밍해 보세요.
        </p>

        <Link
          href={"/login"}
          className={cn(
            "mt-6 px-16 py-4 bg-red-600 text-white rounded-md font-semibold text-lg",
            "transition-colors duration-300 hover:bg-red-700"
          )}
        >
          햄캣 로그인
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;
