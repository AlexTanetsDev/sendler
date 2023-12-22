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
      className={`fixed bottom-10 right-10 bg-greenBtn text-white px-4 py-4 rounded-full hover:bg-green-700 transition-all ${
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
