import Image from "next/image";
import React from "react";

function ServiceDescriptionList() {
  return (
    <ul className="mt-[60px] flex flex-col gap-[80px] text-[#1B1B30] text-base font-montserrat">
      <li key="1" className=" flex gap-[134px]">
        <div className="flex flex-col justify-center items-center gap-[32px] pl-[110px]">
          <p>
            Цей метод має особистісний характер, адже за допомогою повідомлень
            ви доставляєте інформацію безпосередньо клієнту.
          </p>
          <p>
            Нині маркетинг розширює свої межі. Якщо раніше для реклами товарів
            та брендів використовувалися в основному телебачення та зовнішня
            реклама, то тепер у підприємців набагато більше можливостей зробити
            свій товар впізнаваним. Простий та доступний спосіб комунікації з
            потенційними клієнтами – SMS-розсилка.
          </p>
        </div>
        <Image
          src="/woman.png"
          alt="Service description image"
          width={526}
          height={350}
        />
      </li>
      <li key="2" className=" flex gap-[134px]">
        <Image
          src="/globe.png"
          alt="Service description image"
          width={526}
          height={350}
        />
        <div className="flex flex-col justify-center items-center gap-[32px] pr-[110px]">
          <p>
            SMS-реклама допоможе зробити ваш бренд упізнаваним. Звичайно, не всі
            клієнти відреагують на перше повідомлення, але швидше за все їх
            зацікавлять наступні.
          </p>
          <p>
            SMS-розсилка допоможе знайти нових клієнтів, і не втратити старих,
            сповіщаючи їх про акції, знижки та нові пропозиції. Покупці будуть
            зацікавлені, і захочуть дізнатися більше інформації про ваші
            продукти, і про те, що ви можете їм запропонувати.
          </p>
        </div>
      </li>
    </ul>
  );
}

export default ServiceDescriptionList;
