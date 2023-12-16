"use client";

import { usePathname, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { validationSchemaFeedback } from "@/models/users";
import { FormInputFeedback } from "@/globaltypes/types";
import Link from "next/link";

const FormFeedback = () => {
  const pathName = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputFeedback>({
    resolver: async (data) => {
      try {
        await validationSchemaFeedback.validateAsync(data, {
          abortEarly: false,
        });
        return { values: data, errors: {} };
      } catch (error) {
        const validationErrors: Record<string, { message: string }> = {};
        error.details.forEach((detail) => {
          if (detail.context && detail.context.key) {
            validationErrors[detail.context.key] = {
              message: detail.message,
            };
          }
        });

        return {
          values: {},
          errors: validationErrors,
        };
      }
    },
  });

  const onSubmit: SubmitHandler<FormInputFeedback> = async (data) => {};

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-[526px] mx-auto py-11  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700  bg-formBg px-[26px]"
    >
      <h1 className="form-title mb-8">
        Зворотній зв’язок
      </h1>
      <div className="text-left w-full">
        <label
          htmlFor="firstName"
          className="font-roboto text-base font-medium mb-2 block"
        >
          ім’я
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] border-[#737373] bg-gray-300"
          required
        />
        {errors.firstName && (
          <span className="text-red-500 block">{errors.firstName.message}</span>
        )}

        <label
          htmlFor="secondName"
          className="font-roboto text-base font-medium mb-2 block"
        >
          Призвище
        </label>
        <input
          id="secondName"
          type="text"
          {...register("secondName")}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] border-[#737373] bg-gray-300"
          required
        />
        {errors.secondName && (
          <span className="text-red-500 block">
            {errors.secondName.message}
          </span>
        )}

        <label
          htmlFor="phone"
          className="font-roboto text-base font-medium mb-2  mt-8 block"
        >
          Номер телефону
        </label>
        <input
          id="phone"
          type="text"
          {...register("phone")}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] border-[#737373] bg-gray-300"
          required
        />
        {errors.phone && (
          <span className="text-red-500 block">{errors.phone.message}</span>
        )}

        <label
          htmlFor="email"
          className="font-roboto text-base font-medium mb-2  mt-8 block"
        >
          Електронна пошта
        </label>
        <input
          id="email"
          type="text"
          {...register("email")}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] border-[#737373] bg-gray-300"
          required
        />
        {errors.email && (
          <span className="text-red-500 block">{errors.email.message}</span>
        )}

        <label
          htmlFor="desc"
          className="font-roboto text-base font-medium mb-2  mt-8 block"
        >
          Текст повідомлення{" "}
        </label>
        <textarea
          id="desc"
          {...register("desc")}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] border-[#737373] bg-gray-300"
          required
        />
        {errors.desc && (
          <span className="text-red-500 ">{errors.desc.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="w-[209px] mt-8 bg-buttonForm flex items-center justify-center h-[63px]  py-[18px] focus:outline-none hover:bg-blue-700 hover:text-white rounded-[18px] text-lg"
      >
        Відправити
      </button>
    </form>
  );
};

export { FormFeedback };
