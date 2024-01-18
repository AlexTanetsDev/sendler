"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface LogoProps {
  onClose?: () => void;
}

const LogoNav = ({onClose}:LogoProps) => {
  const { data: session, status } = useSession();
  const isLogin = status === "authenticated";
  return isLogin ? (
    <>
      <span className="flex flex-col lg:items-center text-[26px] lg:text-[28px] font-medium text-white mb-1 leading-[39px] h-[30px] ">
        BSender
      </span>
      <span className="text-[12px] lg:text-[14px] leading-[18px] text-white block">Масові смс розсилки</span>
    </>
  ) : (
    <Link href={"/"} className="flex flex-col lg:items-center" onClick={onClose}>
      <span className="text-[26px] lg:text-[28px] font-medium text-white mb-1 leading-[39px] h-[30px] ">BSender</span>
      <span className="text-[12px] lg:text-[14px] text-white block">Масові смс розсилки</span>
    </Link>
  );
};

export default LogoNav;
