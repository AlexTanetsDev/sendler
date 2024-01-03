import { ISession } from "@/globaltypes/types";
import { Session } from "next-auth";

export default function UserSmsInform({
  session,
}: {
  session: ISession | Session | null;
}) {
  const userName = session?.user.user_name;
  const userBalance = session?.user.balance;
  return (
    <div className="w-[259px] h-[61px] mb-[50px] ml-auto flex flex-row justify-center items-center text-2xl rounded-[18px] bg-formBg">
      <p>
        {userName}: {userBalance} SMS
      </p>
    </div>
  );
}
