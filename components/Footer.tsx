import Image from "next/image";
import Link from "next/link";
import React from "react";
import Feedback from "./Feedback";

const Footer = () => {
  return (
    <footer
      id="footer"
      className=" w-full flex justify-center bg-bgFooter   pt-[50px] pb-[38px] text-white font-roboto text-lg font-normal"
    >
      <div className="container">
        <Link href={"/"} className=" inline-flex flex-col items-center gap-1">
          <span className=" text-[34px] font-medium text-white font-montserrat tracking-wide">
            BSender
          </span>
          <span className=" text-sm text-white font-montserrat">
            Масові смс розсилки
          </span>
        </Link>

        <ul className="flex justify-between items-center pt-[60px]">
          <li className="flex flex-col gap-[14px] justify-center">
            <p className=" text-base font-medium ">
              Компанія ТОВ &quot;Інноваційні медіа рішення&quot;
            </p>
            <p className="text-base font-medium">
              Пошта
              <Link
                className="ml-3 text-base underline-offset-1 underline"
                href="mailto:info@bsender.com.ua"
                type="email"
              >
                info@bsender.com.ua
              </Link>
            </p>
            <p className="text-base font-medium">
              Телефон
              <Link className="ml-3 text-base" href="tel:+38 (097) 678-12-59">
                +38 (097) 678-12-59
              </Link>
            </p>
          </li>
          <li className="flex flex-col gap-[14px] justify-center">
            <p className="text-base font-medium ">Юридична адреса</p>
            <p className="text-base">
              01033, Україна, м. Київ, вул. Гайдара, 50
            </p>
            <p className="text-base">
              Мобільний маркетинг, Масові SMS розсилки
            </p>
          </li>
          <li className="flex flex-col gap-[14px] justify-center">
            <Feedback />
          </li>
        </ul>

        <p className=" text-center text-sm mt-[60px]">
          © 2010, BSender.com.ua Всі права захищені
        </p>
      </div>
    </footer>
  );
};

export default Footer;
