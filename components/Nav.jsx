"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogOutButton from "./buttons/LogOutButton";
import { privateNavigation, publicNavigation } from "@/data/data";
import LoginButton from "./buttons/LoginButon";

const Nav = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <nav className="flex justify-between items-center container mx-auto text-white font-montserrat">
        <div>
          <Link href={"/"} className="flex flex-col items-center">
            <span className=" text-[26px] font-medium text-white ">
              BSender
            </span>
            <span className=" text-xs text-white">Масові смс розсилки</span>
          </Link>
        </div>
        <ul className="flex justify-center items-center gap-10">
          {status === "authenticated"
            ? privateNavigation.map(({ id, title, path }) => (
                <li key={id}>
                  <Link
                    href={path}
                    className="hover:underline hover:underline-offset-4 py-4"
                  >
                    {title}
                  </Link>
                </li>
              ))
            : publicNavigation.map(({ id, title, path }) => (
                <li key={id}>
                  <Link
                    href={path}
                    className="hover:underline hover:underline-offset-4 py-4"
                  >
                    {title}
                  </Link>
                </li>
              ))}
          {status === "authenticated" ? <LogOutButton /> : <LoginButton />}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
