"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogOutButton from "./buttons/LogOutButton";
import { privateNavigation, publicNavigation } from "@/data/data";
import LoginButton from "./buttons/LoginButon";
import LogoNav from "./LogoNav";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

const Nav = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={`flex justify-between items-center container mx-auto relative`}
      >
        <div>
          <LogoNav />
        </div>
        <BurgerMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        <ul
          className={`absolute duration-500 z-10 py-6 lg:py-0  ${
            isOpen ? "top-[78px]" : "top-[-800%]"
          }  right-0 block bg-bgFooter lg:flex lg:justify-center lg:items-center lg:gap-10 lg:static lg:bg-transparent lg:w-auto  w-full text-center text-2xl `}
        >
          {status === "authenticated"
            ? privateNavigation.map(({ id, title, path }) => (
                <li key={id} className="mb-4 lg:mb-0">
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href={path}
                    className="hover:underline hover:underline-offset-4 py-4 transition-all"
                  >
                    {title}
                  </Link>
                </li>
              ))
            : publicNavigation.map(({ id, title, path }) => (
                <li className="mb-4 lg:mb-0" key={id}>
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    href={path}
                    className="hover:underline hover:underline-offset-4 py-4 transition-all"
                  >
                    {title}
                  </Link>
                </li>
              ))}
          {status === "authenticated" ? <LogOutButton onClick={() => setIsOpen(!isOpen)} /> : <LoginButton onClick={() => setIsOpen(!isOpen)} />}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
