"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { privateNavigation, publicNavigation } from "@/data/data";
import Image from "next/image";
import LoginButton from "./LoginButon";

const Nav = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <nav className="flex justify-between items-center container py-6">
        <div>
          <Link href={"/"}>
            <Image src="/logo.png" alt="logo" width={133} height={99} />
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
          {status === "authenticated" ? (
            <LogOutButton />
          ) : (
            <LoginButton/>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
