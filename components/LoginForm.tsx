"use client";

import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import type { FormEventHandler } from "react";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

     
    console.log('Logout');
    const formData = new FormData(event.currentTarget);
console.log("formDataf", formData);

    const res = await signIn("credentials", {
      login: formData.get("login"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res && !res.error) {
      router.push("http://localhost:3000/");
    } else {
      console.log(res);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8" >
       <div className="mb-4">
       <input type="text" name="login" className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
      <input type="password" name="password" className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
      </div>
      <div className="flex items-center justify-between">
       <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
        >
          Log In
        </button>
      
       </div>
     
    </form>

    
  );
};

export { LoginForm };