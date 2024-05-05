

import { ISession } from "@/globaltypes/types";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import UserSmsBalansInform from "@/components/UserSmsBalansInform";
import { options } from "../api/auth/[...nextauth]/options";

export const metadata: Metadata = {
	title: "BSender",
	description: "BSender sms sending application",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session: ISession | null = await getServerSession(options);
	return (
		<main className="w-full pt-[60px] pb-20 flex flex-col items-center bg-white">
			<section className="container">
				{session?.user.user_role === 'user' && <UserSmsBalansInform session={session} />}
				{children}
			</section>
		</main>
	);
};
