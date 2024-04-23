import { ISendingProcess } from "@/globaltypes/types";

interface Props {
	process: ISendingProcess;
};

let percentRejected: number;
let percentFullfield: number;
let percentPending: number;
export default function LineDiagram({ process }: Props) {
	let { date, rejected, fullfield, pending } = process;
	if (!fullfield) {
		fullfield = 0;
	};
	if (!rejected) {
		rejected = 0;
	};
	if (!pending) {
		pending = 0;
	};
	const totalSms = rejected + fullfield + pending;
	if (totalSms) {
		percentRejected = rejected / totalSms * 100;
		percentFullfield = fullfield / totalSms * 100;
		percentPending = pending / totalSms * 100;
	};

	return (
		<div className="mb-4">
			<p className="mb-1 text-sm font-montserrat font-normal">{String(date + ' ' + '-' + ' ' + totalSms + ' ' + 'SMS')}</p>
			<div className="flex w-full h-4 text-white text-xs rounded-lg">
				<div className={`bg-[#FFBB28] text-center`} style={{ width: String(percentFullfield + '%') }}>{fullfield}</div>
				<div className={`bg-[#00C49F] text-center`} style={{ width: String(percentPending + '%') }}>{pending}</div>
				<div className={`bg-[#0088FE] text-center`} style={{ width: String(percentRejected + '%') }}>{rejected}</div>
			</div>

		</div>
	);
};


