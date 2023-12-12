import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className=" w-full flex justify-center bg-bg-footer  py-[60px] text-white font-roboto text-lg font-normal"
    >
      <ul className="container">
        <li className="pb-[50px]">
          <Link href={"/"}>
            <Image
              className="hover:scale-110"
              src="/logoFooter.png"
              alt="logo footer"
              width={200}
              height={80}
            />
          </Link>
        </li>
        <li>
          <ul className="flex justify-between items-end">
            <li className="flex flex-col gap-[19px] justify-center">
              <p>Компанія ТОВ &quot;Інноваційні медіа рішення&quot;</p>
              <p className="text-sm ">
                Пошта
                <Link
                  className="ml-3 text-lg underline-offset-1 underline"
                  href="mailto:info@bsender.com.ua"
                  type="email"
                >
                  info@bsender.com.ua
                </Link>
              </p>
              <p className="text-sm">
                Телефон
                <Link className="ml-3 text-lg" href="tel:+38 (097) 678-12-59">
                  +38 (097) 678-12-59
                </Link>
              </p>
            </li>
            <li className="flex flex-col gap-[16px] justify-center">
              <p>Юридична адреса</p>
              <p>01033, Україна, м. Київ, вул. Гайдара, 50</p>
              <p>Мобільний маркетинг, Масові SMS розсилки</p>
            </li>
            <li className="flex flex-col gap-[16px] justify-center">
            <p>© 2010, BSender.com.ua</p>
              <p>Всі права захищені</p>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
