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
      className={`fixed bottom-5 right-5 lg:bottom-10 lg:right-10 bg-transparent border-2 border-greenBtn  px-2 py-2 lg:px-3 lg:py-3 rounded-full hover:bg-greenBtn hover:scale-110 hover:border-transparent  transition-all ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <Image
        src="/svg/arrow-up.svg"
        alt="buton detailes"
        width={48}
        height={48}
      />
    </button>
  );
};

export default BackToTopBtn;
