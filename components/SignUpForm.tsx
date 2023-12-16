"use client";

import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from 'react-hook-form';
import {validationSchemaSignUp } from "@/models/users";
import { FormInputsSignUp } from "@/globaltypes/types";
import Link from "next/link";


const SingUpForm = () => {
  const pathName = usePathname();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsSignUp>({
    resolver: async (data) => {
      try {
        await validationSchemaSignUp.validateAsync(data, { abortEarly: false });
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

  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputsSignUp> = async (data) => {
    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        user_login: data.login,
        user_password: data.password,
        tel: data.phone,
        user_name: data.name,
      }),
    });
    if (res && res.ok) {
      const credentialsRes = await signIn("credentials", {
        login: data.login,
        password: data.password,
        redirect: false,
      });
      if (credentialsRes && !credentialsRes.error) {
        router.push("/");
      } 
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}  className="h-full w-[526px] mx-auto py-11  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700  bg-formBg px-[26px]">
       <h1 className=" form-title mb-8">
        Особистий кабінет
      </h1>
      <div className="flex items-center mb-8">
        {}
        <Link
          href="/login"
          className="font-roboto text-base font-normal mr-[92px] hover:underline hover:underline-offset-4"
        >
          Увійти
        </Link>
        <Link href="/signup" className={`font-roboto text-base font-normal hover:underline hover:underline-offset-4 ${
    pathName.startsWith("/signup") ? "underline underline-offset-4" : ""
  }`}>
          Реєстрація
        </Link>
      </div>
     <div className="text-left w-full">
     <label
          htmlFor="name"
          className="font-roboto text-base font-medium mb-2 block"
        >
          Ім’я
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] border-[#737373] bg-gray-300"
          required
        />
        {errors.name && (
          <span className="text-red-500 block">{errors.name.message}</span>
        )}

<label
          htmlFor="phone"
          className="font-roboto text-base font-medium mb-2  mt-8 block"
        >
          Телефон
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
          Пошта
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
          htmlFor="login"
          className="font-roboto text-base font-medium mb-2  mt-8 block"
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
               <label
          htmlFor="repeatPassword"
          className="font-roboto text-base font-medium mb-2  mt-8 block"
        >
          Підтвердіть пароль 
        </label>
        <input
          id="repeatPassword"
          type="repeatPassword"
          {...register("repeatPassword")}
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] border-[#737373] bg-gray-300"
          required
        />
        {errors.repeatPassword && (
          <span className="text-red-500 ">{errors.repeatPassword.message}</span>
        )}
      </div>

<button
        type="submit"
        className=" mt-8 bg-buttonForm flex items-center justify-center h-[63px] w-full  py-[18px] focus:outline-none hover:bg-blue-700 hover:text-white rounded-[18px] text-lg"
      >
        Реєстрація
      </button>
  </form>
  );
};

export { SingUpForm };
