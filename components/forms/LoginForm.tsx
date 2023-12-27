"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputsLogin } from "@/globaltypes/types";
import { schemaLogin } from "@/models/forms";
import GreenButton from "../buttons/GreenButton";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();

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
          error.details.forEach(
            (detail: { context: { key: string | number }; message: any }) => {
              if (detail.context && detail.context.key) {
                validationErrors[detail.context.key] = {
                  message: detail.message,
                };
              }
            }
          );
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
      toast.success(`Wellcome ${data.login}`)
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-[526px] flex justify-items-center  items-center flex-col leading-6 px-[26px] "
    >
      <div className="text-left w-full mb-8">
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
      <GreenButton size="big">Увійти</GreenButton>
    </form>
  );
};

export { LoginForm };
