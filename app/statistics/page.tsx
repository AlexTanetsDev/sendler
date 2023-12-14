import { getServerSession } from "next-auth";
import UserSmsBalansInform from "@/components/UserSmsBalansInform";
import { options } from "@/app/api/auth/[...nextauth]/options";

import HistoryTable from "@/components/HistoryTable";
import { ISession } from "@/globaltypes/types";

export default async function SendingHistory() {
  const session: ISession | null = await getServerSession(options);
  const userId = session?.user.user_id;

  return (
    <main className="container mx-auto">
      <UserSmsBalansInform session={session} />
      <div className="container xl mx-auto pb-20 pt-[60px]">
        <h1 className="page-title mb-14">Статистика</h1>
        <HistoryTable id={userId} />
      </div>
    </main>
  );
}
