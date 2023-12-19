import { FormFeedback } from "@/components/forms/FormFeedback";
import SmsServiceList from "@/components/startPageComp/SmsServicelist";
import Title from "@/components/Title";
import HeroBtn from "@/components/buttons/HeroBtn";
import Image from "next/image";
import ServiceDescriptionList from "@/components/startPageComp/ServiceDescriptionList";
import Swiper from "@/components/startPageComp/Swiper";

export default async function Home() {
  return (
    <>
      <div className="w-full pb-[321px] pt-[310px] bg-[url('/start-hero.png')] bg-cover ">
        <div className=" container mx-auto ">
          <h1 className=" text-7xl font-bold text-white font-montserrat">
            BSender
          </h1>
          <h2 className=" text-lg font-normal text-white pt-4">
            {
              "Потужна масова SMS розсилка для ефективного зв'язку з вашою аудиторією"
            }
          </h2>
          <div className=" flex gap-[14px] mt-12">
            <HeroBtn linkTo="/login">
              Увійти{" "}
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
      </div>

      <main className="flex flex-col justify-center pt-[80px] w-full bg-[#FEFEFE]">
        <div className="container mx-auto">
          <section className="flex flex-col items-center">
            <Title type="h2">Як працює SMS сервіс</Title>
            <SmsServiceList />
          </section>
          <section className="mt-[80px]">
            <Title type="h2">
              Для чого використовується <br />
              послуга &#34;Масові СМС-Розсилки&#34; :
            </Title>
            <ServiceDescriptionList />
          </section>
        </div>

        <section className="my-[80px] ">
          <div className="container mx-auto">
            <Title type="h2">Чому клієнти обирають нас:</Title>
          </div>
          <div className="mt-[60px]  py-[100px] caruselBg ">
            <Swiper />
          </div>
        </section>
      </main>
    </>
  );
}
