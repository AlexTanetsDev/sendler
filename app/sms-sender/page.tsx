"use client";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { createSmsUrlStr } from "../api/reseller/helpers/createSmsQueryString";
import { addSmsIdentificators } from "../api/reseller/helpers/addSmsIdetificators";
import { useEffect } from "react";

type FormData = {
  clientTel: string;
  smsText: string;
};
type Client = {
  tel: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: number;
  parameter_1?: string;
  parameter_2?: string;
};

function Sender() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const clients: Client[] = [
      {
        tel: 380665616086,
        first_name: "Oleksa",
        middle_name: "Oleksa",
        last_name: "Pupkin",
        date_of_birth: Date.now(),
      },
      // {
      //   tel: 380974113718,
      //   first_name: "Orest",
      //   middle_name: "Oleksa",
      //   last_name: "Pumpkin",
      //   date_of_birth: Date.now(),
      // },
      // {
      //   tel: 380951195816,
      //   first_name: "Zahariy",
      //   middle_name: "Oleksa",
      //   last_name: "Berkut",
      //   date_of_birth: Date.now(),
      // },
    ];

    // const clientObj = { tel: Number(data.clientTel) };
    // clients.push(clientObj);
    handleSendOneClick(clients, data.smsText);
  };

  const handleBalanceClick = async () => {
    try {
      const res = await axios.get("api/reseller/get-balance");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendOneClick = async (clients: Client[], text: string) => {
    const groupResp = await axios.post(
      `api/sending-groups`,
      {
        groupName: "Anatoliy",
        clients: clients,
      },
      {
        params: {
          userId: 13,
        },
      }
    );
    const groupId = groupResp.data.group.group_id;
    console.log("group", groupResp.data);

    const res = await axios.post("api/reseller/send-one", {
      group_id: groupId,
      text,
    });
    console.log(res.data);
  };

  const handleSendByGroupId = async () => {
    try {
      const res = await axios.post("api/reseller/send-sms", {
        group_id: 80,
        user_id: 8,
        text: "send test sms to client with some text more than 140 symbols 1234567891234567788000000000000000000000000000000000000000000000000000000000000000000000000000 00000 00000000000000000 00000000000000 000000000000000000 111111111111 2222222222222 33333333333333  4444444444",
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className=" w-72 h-64 bg-slate-300 rounded-xl flex items-center justify-center flex-col gap-3
  "
    >
      <button
        type="button"
        className=" rounded-xl w-40 p-1 bg-slate-500 text-cyan-50 "
        onClick={handleBalanceClick}
      >
        Get ballance
      </button>
      <button
        type="button"
        className=" rounded-xl w-40 p-1 bg-slate-500 text-cyan-50 "
        onClick={handleSendByGroupId}
      >
        Send sms by group_id
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-2 px-5"
      >
        <label htmlFor="clientTel">
          Client tel
          <input
            className=" outline-none border-none pl-1 w-full"
            {...register("clientTel")}
          />
        </label>

        <label htmlFor="smsText">
          Sms text
          <input
            {...register("smsText")}
            className=" outline-none border-none pl-1 w-full"
          />
        </label>

        <button
          type="submit"
          className="rounded-xl w-40 p-1 bg-slate-500 text-cyan-50 "
        >
          Send sms
        </button>
      </form>
    </div>
  );
}

export default Sender;
