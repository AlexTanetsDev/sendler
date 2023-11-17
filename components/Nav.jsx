"use client";

import Link from "next/link";

const navigation = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Create group", path: "/create-group" },
  { id: 3, title: "Update group", path: "/update-group" },
  { id: 4, title: "History", path: "/sending-history" },
  { id: 5, title: "Login", path: "/login" },
];

const Nav = () => {
  return (
    <nav className="grid grid-cols-3">
      <div>Sendler Logo</div>
      <div className="grid grid-cols-5 gap-6">
        {navigation.map(({ id, title, path }) => (
          <Link key={id} href={path}>
            {title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
