import Title from "@/components/Title";
import Image from "next/image";

const Services = () => {
  return (
    <>
      <section className="bg-[url('/bg-services.jpg')]  bg-cover flex flex-col items-center pt-[206px]  h-[606px] w-full">
        <div className="container ">
          <Title type="h1" color="light">
            {" "}
            Цільові SMS-Розсилки.
          </Title>
        </div>
      </section>

      <section className="container pt-20 flex flex-col">
        <div className=" flex  flex-col lg:flex-row w-full  ">
          <ul className="mr-[174px] w-[636px] pt-[100px]">
            <li className="mb-8">
              <p>
                Якщо Ви зацікавлені в залученні нової аудиторії до Вашого товару
                або сервісу і при цьому бажаєте використовувати один із
                найефективніших способів цільової реклами — SMS-Розсилку,
                компанія пропонує послугу Цільових SMS-Розсилок по базах
                операторів.
              </p>
            </li>
            <li>
              <p>
                Ви самі вибираєте цільову аудиторію та потрібну кількість
                контактів, яким буде доставлено Ваше повідомлення. Можливі такі
                параметри вибору:
              </p>
            </li>
          </ul>
          <ul className="flex flex-col ml-auto lg:ml-0 mt-[50px] lg:mt-0 gap-[22px] font-montserrat">
            <li className="flex items-center  bg-formBg py-[10px] px-[14px] rounded-[18px] w-[486px]">
              <span>
                <Image
                  src="/svg/services/1.svg"
                  width={16}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className="ml-10 text-lg  lg:text-xl">
                Витрати абонента на місяць
              </p>
            </li>
            <li className="flex items-center  bg-formBg py-[10px] px-[14px] rounded-[18px] w-[486px]">
              <span>
                <Image
                  src="/svg/services/2.svg"
                  width={32}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className="ml-6 text-lg  lg:text-xl">
                Місце розташування абонента
              </p>
            </li>
            <li className="flex items-center  bg-formBg py-[10px] px-[14px] rounded-[18px] w-[486px]">
              <span>
                <Image
                  src="/svg/services/3.svg"
                  width={32}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className="ml-6 text-lg  lg:text-xl">
                Знаходження абонента у роумінгу
              </p>
            </li>
            <li className="flex items-center  bg-formBg py-[10px] px-[14px] rounded-[18px] w-[486px]">
              <span>
                <Image
                  src="/svg/services/4.svg"
                  width={34}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className="ml-6 text-lg  lg:text-xl">
                Тип абонента (контракт, pre-paid)
              </p>
            </li>
            <li className="flex items-center  bg-formBg py-[10px] px-[14px] rounded-[18px] w-[486px]">
              <span>
                <Image
                  src="/svg/services/5.svg"
                  width={32}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className="ml-6 text-lg  lg:text-xl">
                Використання додаткових послуг
              </p>
            </li>
          </ul>
        </div>
        <p className="mt-20 font-roboto text-[18px] lg:text-[20px]">
          Зв&apos;яжіться з нами для отримання детальної інформації про вартість
          Цільової SMS-Розсилки.
        </p>
      </section>
    </>
  );
};

export default Services;
