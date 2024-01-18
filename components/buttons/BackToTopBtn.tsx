"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const BackToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
    className={`fixed flex items-center bottom-5  right-5 bg-transparent border-2 border-greenBtn text-greenBtn hover:text-white rounded-full hover:bg-greenBtn hover:scale-105 hover:border-transparent transition-all text-center w-12 h-12 pl-[8px] text-3xl ${
      isVisible ? "opacity-100" : "opacity-0"
    } ${
      "sm:w-16 sm:h-16 sm:pl-[12px] sm:text-4xl"
    } ${
      "md:w-20 md:h-20 md:pl-[14px] md:text-5xl"
    } ${
      "lg:w-24 lg:h-24 lg:pl-[18px] lg:text-6xl"
    }`}
      onClick={scrollToTop}
    >
      <span className="text-center block rotate-[-90deg]">&gt;</span>
    </button>
  );
};
 
export default BackToTopBtn;
