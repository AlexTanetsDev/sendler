"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";
import { config } from "process";
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import {validationSchemaSignUp } from "@/models/users";
import { FormInputsSignUp } from "@/globaltypes/types";


const SingUpForm = () => {
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
    // event.preventDefault();

    // const formData = new FormData(event.currentTarget);

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
        router.push("http://localhost:3000/");
      } else {
        console.log(credentialsRes);
      }
    }

    console.log("RES", res);
    console.log(data);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-md shadow-md">
    <label className="block mb-2">Login:</label>
    <input {...register('login')} className="w-full p-2 border rounded-md" />
    {errors.login && <span className="text-red-500">{errors.login.message}</span>}

    <label className="block mt-4 mb-2">Password:</label>
    <input type="password" {...register('password')} className="w-full p-2 border rounded-md" />
    {errors.password && <span className="text-red-500">{errors.password.message}</span>}

    <label className="block mt-4 mb-2">Repeat Password:</label>
    <input type="password" {...register('repeatPassword')} className="w-full p-2 border rounded-md" />
    {errors.repeatPassword && <span className="text-red-500">{errors.repeatPassword.message}</span>}

    <label className="block mt-4 mb-2">Phone:</label>
    <input {...register('phone')} className="w-full p-2 border rounded-md" />
    {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}

    <label className="block mt-4 mb-2">Email:</label>
    <input type="email" {...register('email')} className="w-full p-2 border rounded-md" />
    {errors.email && <span className="text-red-500">{errors.email.message}</span>}

    <label className="block mt-4 mb-2">Name:</label>
    <input {...register('name')} className="w-full p-2 border rounded-md" />
    {errors.name && <span className="text-red-500">{errors.name.message}</span>}

    <button type="submit" className=" mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
      Sugn Up
    </button>
  </form>
  );
};

export { SingUpForm };
