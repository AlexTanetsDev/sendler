"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const LogoFooter = () => {
  const { data: session, status } = useSession();
  const isLogin = status === "authenticated";
  return isLogin ? (
    <div className="inline-flex flex-col items-center gap-1">
      <span className=" text-[34px] font-medium text-white font-montserrat tracking-wide">
        BSender
      </span>
      <span className=" text-sm text-white font-montserrat">
        Масові смс розсилки
      </span>
    </div>
  ) : (
    <Link href={"/"} className=" inline-flex flex-col items-center gap-1">
      <span className=" text-[34px] font-medium text-white font-montserrat tracking-wide">
        BSender
      </span>
      <span className=" text-sm text-white font-montserrat">
        Масові смс розсилки
      </span>
    </Link>
  );
};

export default LogoFooter;
