import React from 'react';

import UserSmsBalansInform from '@/components/UserSmsBalansInform';
import UserPageTitle from '@/components/UserPageTitle';

const CreateGroupPage = () => {
	return (
		<main className='container mx-auto'>
			<UserSmsBalansInform />
			<UserPageTitle>Управління контактами</UserPageTitle>
			<div className='w-full h-96 px-8 py-14 rounded-2xl bg-gray-400'>
				<p className='text-2xl font-medium'>Створення групи</p>
			</div>
		</main>
	)
}

export default CreateGroupPage;