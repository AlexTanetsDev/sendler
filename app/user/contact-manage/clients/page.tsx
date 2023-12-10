import React from 'react';

import UserSmsBalansInform from '@/components/UserSmsBalansInform';
import UserPageTitle from '@/components/UserPageTitle';

const ContactManagmentPage = () => {
	return (
		<main className='container mx-auto'>
			<UserSmsBalansInform />
			<UserPageTitle>Управління контактами</UserPageTitle>
			<div className='w-2/5 h-96 flex flex-row justify-center p-8 rounded-2xl bg-gray-400'>
				<p className='text-2xl font-medium'>Редагування групи</p>
			</div>
		</main>
	)
}

export default ContactManagmentPage;