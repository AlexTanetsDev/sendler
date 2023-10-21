"use client";
import axios from "axios";

function Sender() {
  const handleBalanceClick = async () => {
    const res = await axios.get("api/reseller/get-balance");
    console.log(res.data);
  };

  const handleSendOneClick = async () => {
    const res = await axios.get("api/reseller/send-one");
    console.log(res.data);
  };
  return (
    <div
      className=" w-72 h-60 bg-slate-300 rounded-xl flex items-center justify-center flex-col gap-3
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
        onClick={handleSendOneClick}
      >
        Send sms
      </button>
    </div>
  );
}

export default Sender;
