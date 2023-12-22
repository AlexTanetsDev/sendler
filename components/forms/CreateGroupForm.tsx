'use client';

export default function CreateGroupForm() {
	return (
		<form className='w-7/12 mb-14 ml-8'>
			<label htmlFor='groupName' className='block mb-3.5 input__title'>
				Назва групи
			</label>
			<div className='flex items-center'>
				<input type='text' name='groupName' className='h-12 mr-8 grow input'></input>
				<button type="submit" className='action__btn'>Створити</button>
			</div>
		</form>
	)
}
