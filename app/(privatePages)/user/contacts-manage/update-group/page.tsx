import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";

import UserSmsBalansInform from "@/components/UserSmsBalansInform";

import { ISession } from "@/globaltypes/types";

export default async function UpdateGroupPage() {
	const session: ISession | null = await getServerSession(options);

	return (
		<main className="container mx-auto">
			<UserSmsBalansInform session={session} />
			<h1 className="page-title mb-14">Управління контактами</h1>
			<div className="content-block">
				<h2 className="content-block__title">Редагування групи</h2>
			</div>
		</main>
	);
}
