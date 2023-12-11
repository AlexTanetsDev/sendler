"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";

const navigation = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Create group", path: "/create-group" },
  { id: 3, title: "Update group", path: "/update-group" },
  { id: 4, title: "History", path: "/sending-history" },
  { id: 5, title: "Dashboard", path: "/dashboard" },
];

const publicNavigation = [
  { id: 1, title: "Головна", path: "/" },
  { id: 2, title: "Про нас", path: "/about" },
  { id: 3, title: "Ціни", path: "/prices" },
  { id: 4, title: "Питання", path: "/questions" },
  { id: 5, title: "Послуги", path: "/services" },
  { id: 6, title: "Контакти", path: "/contacts" },
];

const privateNavigation = [
  { id: 1, title: "Головна", path: "/" },
  { id: 2, title: "Розсилка", path: "/mailing-list" },
  { id: 3, title: "Управління контактами", path: "/user/contacts-manage" },
  { id: 4, title: "Статистика", path: "/statistics" },
  { id: 5, title: "Особистий кабінет", path: "/user/account" },
];

const Nav = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <nav className="grid grid-cols-3">
        <div>Sendler Logo</div>
        <div
          className={`grid  gap-6 ${
            status === "authenticated" ? "grid-cols-6" : "grid-cols-7"
          }`}
        >
          {status === "authenticated"
            ? privateNavigation.map(({ id, title, path }) => (
                <Link
                  key={id}
                  href={path}
                  className="hover:underline hover:underline-offset-4 py-6"
                >
                  {title}
                </Link>
              ))
            : publicNavigation.map(({ id, title, path }) => (
                <Link
                  key={id}
                  href={path}
                  className="hover:underline hover:underline-offset-4 py-6"
                >
                  {title}
                </Link>
              ))}
          {status === "authenticated" ? (
            <LogOutButton />
          ) : (
            <Link
              href="/api/auth/signin"
              className="hover:underline hover:underline-offset-4 py-6"
            >
              Увійти
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
