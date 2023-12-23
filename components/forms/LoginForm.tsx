"use client";

import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputsLogin } from "@/globaltypes/types";
import { schemaLogin } from "@/models/forms";

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
      } catch (error: any) {
        const validationErrors: Record<string, { message: string }> = {};
        if (error.details) {
          error.details.forEach((detail: { context: { key: string | number; }; message: any; }) => {
            if (detail.context && detail.context.key) {
              validationErrors[detail.context.key] = {
                message: detail.message,
              };
          }
        });
      }
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
      router.push("/mailing-list");
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className=" w-[526px] mx-auto py-11  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700 px-[26px] bg-formBg"
    >
      <h1 className="form-title mb-8">Особистий кабінет</h1>
      <div className="flex items-center mb-8">
        <Link
          href="/login"
          className={`font-roboto text-base font-normal hover:underline hover:underline-offset-4 mr-[92px] ${
            pathName.startsWith("/login") ? "underline underline-offset-4" : ""
          }`}
        >
          Увійти
        </Link>
        <Link
          href="/signup"
          className="font-roboto text-base font-normal hover:underline hover:underline-offset-4 "
        >
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
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input"
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
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 rounded-[18px] input"
          required
        />
        {errors.password && (
          <span className="text-red-500 ">{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="mt-8 bg-greenBtn flex items-center justify-center h-[63px] w-[198px]  py-[18px] focus:outline-none hover:bg-blue-700 hover:text-white rounded-[18px] text-lg  transition-colors"
      >
        Увійти
      </button>
    </form>
  );
};

export { LoginForm };
