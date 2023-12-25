"use client";
import type { Metadata } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "Authorization",
  description: "BSender sms sending application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <div className="w-screen h-screen overflow-y-auto  bg-cover bg-center bg-[url('/bg-auth.png')] flex items-left justify-left pt-[190px] mb-20">
      <div className=" container mx-auto flex items-start">
        <div className=" w-[526px] py-11  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700 px-[26px] bg-formBg">
          <h1 className="form-title mb-8">Особистий кабінет</h1>
          <div className="flex items-center mb-8">
            <Link
              href="/login"
              className={`font-roboto text-base font-normal hover:underline hover:underline-offset-4 mr-[92px] ${
                pathName.startsWith("/login")
                  ? "underline underline-offset-4"
                  : ""
              }`}
            >
              Увійти
            </Link>
            <Link
              href="/signup"
              className="font-roboto text-base font-normal hover:underline hover:underline-offset-4 "
            >
              Реєстрація
            </Link>
          </div>
          <>{children}</>
        </div>
      </div>
    </div>
  );
}
