"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";
import { config } from "process";

const SingUpForm = () => {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        user_login: formData.get("login"),
        user_password: formData.get("password"),
        tel: formData.get("tel"),
        user_name: formData.get("name"),
      }),
    });
    if (res && res.ok) {
      const credentialsRes = await signIn("credentials", {
        login: formData.get("login"),
        password: formData.get("password"),
        redirect: false,
      });
      if (credentialsRes && !credentialsRes.error) {
        router.push("http://localhost:3000/");
      } else {
        console.log(credentialsRes);
      }
    }

    console.log("RES", res);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-8"
      autoComplete="off"
    >
      <div className="mb-4">
        <input
          type="text"
          name="login"
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 "
          placeholder="Your login"
          required
        />
        <input
          type="password"
          name="password"
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Your password"
          required
        />
        <input
          type="text"
          name="name"
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Your Name"
          required
        />
        <input
          type="tel"
          name="tel"
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Your phone number"
          required
        />
        <input
          type="email"
          name="email"
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Your email"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export { SingUpForm };
