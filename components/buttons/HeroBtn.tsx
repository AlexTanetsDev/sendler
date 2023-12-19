"use-client";

import Link from "next/link";
import { ReactElement } from "react";

function HeroBtn({
  children,
  linkTo,
}: {
  children: React.ReactNode;
  linkTo: string;
}) {
  return (
    <Link
      href={linkTo}
      className=" w-[144px] py-[10px] rounded-[14px] bg-[#32BB79] hover:bg-green-700 text-white text-base flex items-center justify-center transition-colors"
    >
      {children}
    </Link>
  );
}

export default HeroBtn;
