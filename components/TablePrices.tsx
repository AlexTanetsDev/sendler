import { PricesArray } from '@/data/data';

const TablePrices = () => {
	return (
		<table className="lg:w-[746px] w-[626px] ml-auto bg-priceTableBg  border border-priceTableBorderColor lg:ml-6">
			<thead className="bg-lightGreen">
				<tr>
					<th className="py-[10px] px-3 border font-roboto text-xl font-normal text-left">СМС</th>
					<th className="py-[10px] px-3 border font-roboto text-xl font-normal text-left">
						Ціна одного SMS, грн.
					</th>
				</tr>
			</thead>
			<tbody className=" text-xl">
				{PricesArray.map(elem => (
					<tr key={elem.id}>
						<td className="py-4 px-3 border font-montserrat text-xl">Від {elem.count}</td>
						<td className="py-4 px-3 border font-montserrat text-xl">
							{elem.price} {elem.desc}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TablePrices;
