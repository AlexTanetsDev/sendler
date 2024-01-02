'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const TitleAuthForm = () => {
    const pathName = usePathname();
  return (
    <div className="flex items-center mb-8">
            <Link
              href="/login"
              className={`font-roboto text-base font-normal hover:underline hover:underline-offset-4 mr-[92px] ${
                pathName.startsWith("/login")
                  ? "underline underline-offset-4"
                  : ""
              }`}
            >
              Увійти
            </Link>
            <Link
              href="/signup"
              className={`font-roboto text-base font-normal hover:underline hover:underline-offset-4  ${
                pathName.startsWith("/signup")
                  ? "underline underline-offset-4"
                  : ""
              }`}
            >
              Реєстрація
            </Link>
          </div>
  )
}

export default TitleAuthForm