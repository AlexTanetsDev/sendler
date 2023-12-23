import { useSession } from "next-auth/react";
import Link from "next/link";
import LogOutButton from "./buttons/LogOutButton";
import { privateNavigation, publicNavigation } from "@/data/data";
import LoginButton from "./buttons/LoginButon";
import LogoNav from "./LogoNav";

const Nav = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <nav className={`flex justify-between items-center container mx-auto `}>
        <div>
          <LogoNav/>
        </div>
        <ul className="flex justify-center items-center gap-10">
          {status === "authenticated"
            ? privateNavigation.map(({ id, title, path }) => (
                <li key={id}>
                  <Link
                    href={path}
                    className="hover:underline hover:underline-offset-4 py-4 transition-all"
                  >
                    {title}
                  </Link>
                </li>
              ))
            : publicNavigation.map(({ id, title, path }) => (
                <li key={id}>
                  <Link
                    href={path}
                    className="hover:underline hover:underline-offset-4 py-4 transition-all"
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
