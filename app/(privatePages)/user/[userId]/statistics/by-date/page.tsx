import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getUserHistory } from "@/app/utils";
import formatTableDate from "@/app/utils/formatTableDate";
import Title from "@/components/Title";
import HistoryPeriodForm from "@/components/forms/HistoryPeriodForm";
import BackStatisticsBtn from "@/components/buttons/BackStatisticsBtn";
import { IHistoryResponce } from "@/globaltypes/historyTypes";
import { ISession } from "@/globaltypes/types";

//testData
const userHistory = [
  {
    history_id: 12345,
    text: "Запрошуємо",
    user: "FASONCHIKI",
    status: "Відправлено",
  },
];

export default async function DayHistory() {
  const session: ISession | null = await getServerSession(options);
  const userId = session?.user.user_id;

  //   const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
  //     id: userId,
  //   });


  const date = new Date();

  return (
    <section className="container mx-auto">
      <Title type="h1" color="dark">
        Статистика за датою
      </Title>
      <div className="mt-[60px]">
        <div className="content-block">
          <HistoryPeriodForm />
          <div className="ml-[26px]">
            <p className="mb-5 text-xl font-roboto text-[#1B1B30]">
              Розсилки за {formatTableDate(date)}
            </p>
            <BackStatisticsBtn>
              <p>Повернутись до загальної статистики за період</p>
            </BackStatisticsBtn>
          </div>
          <div className="flex items-center justify-between h-[58px] px-[26px] font-roboto text-[20px] text-white bg-[#417D8A]">
            <p className="w-[130px]">Текст sms</p>
            <p className="w-[118px]">Відправник</p>
            <p className="w-[126px]">Статус </p>
            <p className="w-[160px]">Доставлено sms</p>
            <p className="w-[200px]">Доставлено номерів</p>
            <p className="w-[77px]">
              <Image
                src="/svg/excel.svg"
                alt="Excel icon"
                width={42}
                height={42}
              />
            </p>
            <p className="w-[73px]">Дії</p>
          </div>

          <ul>
            {userHistory &&
              userHistory.length !== 0 &&
              userHistory.map((item) => {
                return (
                  <li
                    key={item.history_id}
                    className="flex items-center justify-between h-[47px] px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE]"
                  >
                    <p className="w-[130px] text-[#2366E8]">
                      <Link href={`by-date/${item.history_id}`}>
                        {item.text}
                      </Link>
                    </p>
                    <p className="w-[118px]">{item.user}</p>
                    <p className="w-[126px]">{item.status}</p>
                    <p className="w-[160px]">42</p>
                    <p className="w-[200px]">40</p>
                    <p className="w-[77px] text-[#2366E8]">Export</p>
                    <p className="w-[73px]">&#8212;</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}
