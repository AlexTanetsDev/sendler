"use client";

import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function BackStatisticsBtn({ children }: Props) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      router.back();
    } catch (error: any) {
      console.log(error.message);
      router.push("/");
    }
  };
  return (
    <button
      onClick={handleClick}
      className="mb-10 text-lg font-roboto text-[#2366E8]"
    >
      {children}
    </button>
  );
}
