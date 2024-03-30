import TablePrices from '@/components/TablePrices';
import Title from '@/components/Title';
import HeroBtn from '@/components/buttons/HeroBtn';
import Image from 'next/image';

const Prices = () => {
  return (
    <>
      <section className="w-full bg-[url('/bg-prices.jpg')] bg-cover flex flex-col items-center pt-[213px] pb-[248px] h-[606px]">
        <div className="container ">
          <Title type="h1" color="light">
            {' '}
            Вартість послуг на SMS розсилку
          </Title>
          <div className=" flex gap-[14px] mt-11 lg:mt-12 ">
            <HeroBtn linkTo="/login">
              Увійти{' '}
              <Image
                className="ml-1 text-white"
                src="/svg/login.svg"
                alt="icon login logout"
                width={24}
                height={24}
              />
            </HeroBtn>
            <HeroBtn linkTo="/signup">Реєстрація</HeroBtn>
          </div>
        </div>
      </section>
      <section className="pt-20 pb-[30px] flex flex-col items-center">
        <div className="container ">
          <div className="lg:flex items-center w-full">
            <div className="lg:w-5/12 w-[525px] mb-[50px] lg:mb-0">
              <p className="font-roboto text-xl mb-2">Використання системи включає:</p>
              <p className="mb-8">Необмежену кількість відправлених СМС.</p>
              <p className="mb-8">
                Вибір імені відправника (підпису). <br />
                Завантажити заявку з активації імені.
              </p>
              <p>
                У Вас може бути декілька імен відправника (підписів). Ви повинні мати право
                використовувати ці імена. Кожне ім&apos;я відправника проходить попередню перевірку
                нашої компанії.
              </p>
            </div>
            <div className="flex  w-full">
              <TablePrices />
            </div>
          </div>
          <p className="font-roboto text-xl mt-20">
            Ваша компанія несе повну відповідальність за будь-які скарги Ваших клієнтів, яким було
            надіслано СМС-Повідомлення. ТОВ &quot;Інноваційні медіа рішення&quot; залишає за собою
            право змінити вищезгадані ціни, повідомивши Вас заздалегідь.
          </p>
        </div>
      </section>
    </>
  );
};

export default Prices;
