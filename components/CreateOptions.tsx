type Props = {
	min: number;
	max: number;
}

const CreateOptions = ({ min, max }: Props) => {
	const optionsValus = (min: number, max: number) => {
		const optionsArray = [];
		for (let i = min; i <= max; i += 1) {
			optionsArray.push(i);
		}
		return optionsArray;
	};

	const selectOptions = optionsValus(min, max);

	return (
		<>
			{selectOptions.map((selectOption) => (
				<option key={selectOption} value={selectOption}>{selectOption}</option>
			))}
		</>
	)
}
export default CreateOptions
