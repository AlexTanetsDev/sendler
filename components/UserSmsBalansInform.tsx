import { ISession } from "@/globaltypes/types";

export default function UserSmsInform({
  session,
}: {
  session: ISession | null;
}) {
  const userName = session?.user.user_name;
  const userBalance = session?.user.balance;
  return (
    <div className="w-80 h-16 mb-14 ml-auto flex flex-row justify-center items-center  rounded-2xl bg-formBg ">
      <p className="text-greyBasic text-[22px]">
        {userName}: {userBalance} SMS
      </p>
    </div>
  );
}
