import Link from "next/link";
import GreenButton from "./GreenButton";

type Props = {
	id: number | undefined;
	children: React.ReactNode;
}

export default function ReviewClientsBtn({ id, children }: Props) {

	return (
		<GreenButton size="normal">
			<Link href={`/user/${id}/clients`}>
				{children}
			</Link>
		</GreenButton>

	)
}