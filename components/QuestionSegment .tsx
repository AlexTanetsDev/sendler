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
        className="flex justify-between  items-center text-start w-full py-[14px] lg:py-[22px]"
      >
        <h3 className=" lg:text-xl text-lg font-roboto block">{title}</h3>
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
        className={` text-[16px] mt-3 lg:mt-10 pr-6 lg:pr-[196px] pb-5 ${
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
