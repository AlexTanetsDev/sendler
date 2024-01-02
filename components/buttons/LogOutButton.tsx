"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

type LogOutButtonProps = {
  onClick: () => void;
};

const LogOutButton: React.FC<LogOutButtonProps> = ({ onClick }) => {
  const router = useRouter();

  const handleLogOut = () => {
    onClick();
    signOut({ callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogOut}
      className="flex justify-center items-center hover:underline hover:underline-offset-4 py-4 ml-11"
      type="button"
    >
      Вийти
      <Image
        className="ml-1"
        src="/svg/login.svg"
        alt="icon login logout"
        width={30}
        height={30}
      />
    </button>
  );
};

export default LogOutButton;