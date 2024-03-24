"use client"

import { fetchUser } from "@/api-actions";
import TablePaymentHistory from "@/components/TablePaymentHistory";
import TableUserInfo from "@/components/TableUserInfo";
import { getUser } from "@/fetch-actions/usersFetchActions";
import { IUser } from "@/globaltypes/types";
import { useEffect, useState } from "react";

const Detail = ({ params }: { params: { userid: string} }) => {
  const userId = Number(params.userid);
  const [user, setUser] = useState<IUser | null>();
console.log(user);

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
  }, [userId]);
  

  return <div className="flex">
  <TablePaymentHistory/>
  <TableUserInfo/>
  </div>;
};

export default Detail;
