import Link from "next/link";
import React from "react";

function SmsServiceList() {
  return (
    <ul className="smsServiseList grid grid-cols-3 gap-6 mt-[60px]">
      <SmsServiseCard
        title="Створення та керування СМС-розсилкою"
        descr="Ви задаєте текст повідомлення, вибираєте групи абонентів, які отримають повідомлення, і вказуєте час, коли повідомлення будуть відправленні отримувачам."
      ></SmsServiseCard>
      <SmsServiseCard
        linkText="Інструкція"
        linkTo="/"
        title="Альфа ім'я відправника SMS-повідомлення"
        descr="Ви самі вибираєте підпис (ім'я відправника), який відображатиметься замість номера відправника SMS-повідомлення. "
      ></SmsServiseCard>
      <SmsServiseCard
        title="Звіти про доставку ваших повідомлень"
        descr="Звіт з кожної СМС-Розсилки Ви зможете переглянути on-line на сайті або завантажити у зручному форматі (Excel)."
      ></SmsServiseCard>
      <SmsServiseCard
        title="Створення та редагування груп абонентів"
        descr="Ви задаєте текст повідомлення, вибираєте групи абонентів, які отримають повідомлення, і вказуєте час, коли повідомлення будуть відправленні отримувачам."
      ></SmsServiseCard>
      <SmsServiseCard
        linkText="Реєстрація"
        linkTo="/"
        title="Покриття  мобільних операторів зв’язку"
        descr="Ви маєте можливість надсилати повідомлення абонентам усіх українських мобільних операторів. На запит доступні інші країни."
      ></SmsServiseCard>
      <SmsServiseCard
        title="Послуга не потребує встановлення"
        descr="Ви зможете надсилати SMS-повідомлення з будь-якого комп'ютера, підключеного до Інтернету, використовуючи наш сайт."
      ></SmsServiseCard>
    </ul>
  );
}

export default SmsServiceList;

function SmsServiseCard({ title, descr, linkText, linkTo }: ICardProps) {
  return (
    <li className="smsServiseCard" key={title}>
      <p className=" font-montserrat font-medium text-xl leading-[30px] text-[#1B1B30] mb-7">
        {title}
      </p>
      <p className=" font-montserrat text-base leading-[24px] text-[#1B1B30]">
        {descr}
        {linkTo && (
          <Link href={linkTo} className="text-[#2366E8] underline">
            {linkText}
          </Link>
        )}
      </p>
    </li>
  );
}

interface ICardProps {
  title: string;
  descr: string;
  linkText?: string;
  linkTo?: string;
}
