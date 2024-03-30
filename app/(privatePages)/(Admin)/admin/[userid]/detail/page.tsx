'use client';

import TablePaymentHistory from '@/components/TablePaymentHistory';
import TableUserInfo from '@/components/TableUserInfo';
import DescUserForm from '@/components/forms/DescUserForm';
import { getUser } from '@/fetch-actions/usersFetchActions';
import { IUser } from '@/globaltypes/types';
import { DeleteUser } from '@/helpers/fetchUserId';

import { useEffect, useState } from 'react';

const Detail = ({ params }: { params: { userId: string } }) => {
  const userId = Number(params.userId);
  const [user, setUser] = useState<IUser>();
  const [isUpdated, setisUpdated] = useState(false);

  const handleDelete = async (userId: number) => {
    await DeleteUser(userId);
    setisUpdated(prevIsUpdate => !prevIsUpdate);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(userId);
        setUser(response?.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, isUpdated]);

  return (
    <>
      <div className="flex mt-10 justify-center items-center">
        {user && <TableUserInfo user={user} handleDelete={handleDelete} />}
        {user && <DescUserForm userId={userId} />}
      </div>
      <TablePaymentHistory userId={userId} />
    </>
  );
};

export default Detail;
