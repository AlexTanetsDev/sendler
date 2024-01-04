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
        className="flex justify-between  items-center text-start w-full py-4 lg:py-5"
      >
        <h3 className="max-w-[575px] lg:max-w-none lg:text-xl text-lg font-roboto block">{title}</h3>
        <span className="block ml-10">
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
        className={` text-[16px] mt-4 lg:mt-5 lg:pr-[196px] pb-4 lg:pb-5 ${
          expanded ? "hidden " : " blok"
        }`}
      >
        {desc}
        {email && (
          <Link href={`mailto:${email}`} className="text-emailColorLink">
            {email}
          </Link>
        )}
      </p>
    </>
  );
};

export default QuestionSegment;
