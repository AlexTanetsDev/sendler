"use client";

import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputsLogin } from "@/globaltypes/types";
import { schemaLogin } from "@/models/users";

const LoginForm = () => {
  const router = useRouter();
  const pathName = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsLogin>({
    resolver: async (data) => {
      try {
        await schemaLogin.validateAsync(data, { abortEarly: false });
        return { values: data, errors: {} };
      } catch (error) {
        const validationErrors: Record<string, { message: string }> = {};
        error?.details.forEach((detail: any) => {
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

  const onSubmit: SubmitHandler<FormInputsLogin> = async (data) => {
    const res = await signIn("credentials", {
      login: data.login,
      password: data.password,
      redirect: false,
    });
    if (res && !res.error) {
      router.push("/");
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-[526px] mx-auto py-11  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700 px-[26px] bg-formBg"
    >
      <h1 className=" font-roboto text-xl font-medium mb-8">
        Особистий кабінет
      </h1>
      <div className="flex items-center mb-8">
        <Link
          href="/login"
          className={`font-roboto text-base font-normal hover:underline hover:underline-offset-4 mr-[92px] ${
            pathName.startsWith("/login") ? "underline underline-offset-4" : ""
          }`}
      
        >
          Увійти
        </Link>
        <Link href="/signup" className="font-roboto text-base font-normal hover:underline hover:underline-offset-4 ">
          Реєстрація
        </Link>
      </div>
      <div className="text-left w-full">
        <label
          htmlFor="login"
          className="font-roboto text-base font-medium mb-2 block"
        >
          Логін
        </label>
        <input
          id="login"
          type="text"
          {...register("login")}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] border-[#737373] bg-gray-300"
          required
        />
        {errors.login && (
          <span className="text-red-500 block">{errors.login.message}</span>
        )}

        <label
          htmlFor="password"
          className="font-roboto text-base font-medium mb-2  mt-8 block"
        >
          Пароль
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] border-[#737373] bg-gray-300"
          required
        />
        {errors.password && (
          <span className="text-red-500 ">{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-[#ADA3A3] mt-8 flex items-center justify-center h-[63px] w-full  py-[18px] focus:outline-none hover:bg-blue-700 hover:text-white rounded-[18px] text-lg"
      >
        Увійти
      </button>
    </form>
  );
};

export { LoginForm };
