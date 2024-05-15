import { fetchUser } from '@/api-actions';
import BackBtn from '@/components/buttons/BackBtn';
import SMSReductionForm from '@/components/forms/SMSReductionForm';
import React from 'react';

const EditTransaction = async ({
  params,
}: {
  params: { userId: string; transactionId: string };
}) => {
  const userInfo = await fetchUser(params.userId);

  return (
    <>
      <BackBtn />{' '}
      <div className="flex items-center flex-col">
        <p className="text-xl m-8">
          {' '}
          Ви працюєте з обліковим записом користувача{' '}
          <span className=" text-2xl">{userInfo?.user_login}</span> (транзакція{' '}
          {params.transactionId})
        </p>
        {userInfo?.user_id && <SMSReductionForm userId={userInfo?.user_id} transactionId={Number(params.transactionId)} />}
      </div>
    </>
  );
};

export default EditTransaction;
