import { getServerSession } from "next-auth";

export default async function UserSmsInform({ session }) {
  const userName = session?.user.user_name;
  const userBalance = session?.user.balance;
  return (
    <div className="w-80 h-16 mb-14 ml-auto flex flex-row justify-center items-center text-2xl rounded-2xl bg-darkGreyColor">
      <p>
        {userName}: {userBalance} SMS
      </p>
    </div>
  );
}
