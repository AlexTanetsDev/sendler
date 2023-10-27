"use client";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  clientTel: string;
  smsText: string;
};
type Client = {
  tel: number;
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
      { tel: 380665616086 },
      { tel: 380974113718 },
      { tel: 380951195816 },
    ];
    // const clientObj = { tel: Number(data.clientTel) };
    // clients.push(clientObj);
    handleSendOneClick(clients, data.smsText);
  };

  const handleBalanceClick = async () => {
    const res = await axios.get("api/reseller/get-balance");
    console.log(res.data);
  };

  const handleSendOneClick = async (clients: Client[], text: string) => {
    const groupResp = await axios.post(`api/sending-groups`, {
      id: 9,
      name: clients[0].tel,
      clients: clients,
    });
    const groupId = groupResp.data.group_id;

    // const res = await axios.post("api/reseller/send-one", {
    //   groupId: 26,
    //   userId: 9,
    //   text,
    // });
    console.log(groupId);
  };

  const handleSendFewClick = async () => {
    const res = await axios.post("api/reseller/send-few", {
      group_id: 110,
      text: "some+test+sms+to+few+clients",
    });

    console.log(res.data);
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

      <button
        type="button"
        className=" rounded-xl w-40 p-1 bg-slate-500 text-cyan-50 "
        onClick={handleSendFewClick}
      >
        Send few
      </button>
    </div>
  );
}

export default Sender;
