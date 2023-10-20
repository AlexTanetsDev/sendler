"use client";

import Link from "next/link";

const navigation = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Groups", path: "/groups" },
];

const Nav = () => {
  return (
    <nav className="grid grid-cols-3">
      <div>Sendler Logo</div>
      <div className="grid grid-cols-3 gap-6">
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
