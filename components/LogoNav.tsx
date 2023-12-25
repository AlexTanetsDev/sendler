"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const LogoNav = () => {
  const { data: session, status } = useSession();
  const isLogin = status === "authenticated";
  return isLogin ? (
    <>
      <span className="flex flex-col items-center text-[26px] font-medium text-white ">
        BSender
      </span>
      <span className=" text-xs text-white">Масові смс розсилки</span>
    </>
  ) : (
    <Link href={"/"} className="flex flex-col items-center">
      <span className=" text-[26px] font-medium text-white ">BSender</span>
      <span className=" text-xs text-white">Масові смс розсилки</span>
    </Link>
  );
};

export default LogoNav;
