"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  title: string;
  desc: string;
  email?: string;
};

const QuestionSegment = ({ title, desc, email }: Props) => {
  const [expanded, setExpanded] = useState(true);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <button
        onClick={toggleDescription}
        className="flex justify-between items-center w-full py-[22px]"
      >
        <h3 className=" text-xl font-roboto block">{title}</h3>
        <span className="block">
          {expanded ? (
            <Image
              src="/svg/arrow-down.svg"
              alt="buton detailes"
              width={32}
              height={32}
            />
          ) : (
            <Image
              src="/svg/arrow-up.svg"
              alt="buton detailes"
              width={32}
              height={32}
            />
          )}
        </span>
      </button>
      <p
        className={` text-[16px] mt-10 pr-[196px] ${
          expanded ? "hidden " : " blok"
        }`}
      >
        {desc}
        {email && (
          <Link href={`mailto:${email}`} className="text-colorLink">
            {email}
          </Link>
        )}
      </p>
    </>
  );
};

export default QuestionSegment;
