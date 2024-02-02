import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import Title from "@/components/Title";
import HistoryTable from "@/components/HistoryTable";
import { ISession } from "@/globaltypes/types";

export default async function SendingHistory() {
  const session: ISession | null = await getServerSession(options);
  const userId = session?.user.user_id;

  return (
    <section className="container mx-auto">
      <Title type="h1" color="dark">
        Статистика
      </Title>
      <div className="mt-[60px]">
        <HistoryTable id={userId} />
      </div>
    </section>
  );
}
