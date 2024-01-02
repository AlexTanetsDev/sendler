"use client";

import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { validationSchemaFeedback } from "@/models/forms";
import { FormInputFeedback } from "@/globaltypes/types";
import GreenButton from "../buttons/GreenButton";

interface Props {
  onClose: (() => void) | undefined;
  title?: string;
}

const FormFeedback = ({ onClose, title }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputFeedback>({
    resolver: async (data) => {
      try {
        await validationSchemaFeedback.validateAsync(data, {
          abortEarly: false,
        });
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

  const onSubmit: SubmitHandler<FormInputFeedback> = async (data) => {
    console.log("dat=", data);
    reset();
    {
      onClose && onClose();
    }

    toast.success(
      "Your submission has been received. We will respond to it as soon as possible."
    );
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-[526px] mx-auto pb-11 pt-[29px]  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700  bg-formBg px-[26px]"
    >
      {title && <h1 className="form-title mb-8 mt-[15px]">{title}</h1>}
      <div className="text-left w-full mb-8">
        <label
          htmlFor="name"
          className="font-roboto text-base font-medium mb-2 block"
        >
         П.І.Б
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="input w-full border py-2 px-3 focus:outline-none focus:border-blue-500 "
        />
        {errors.name && (
          <span className="text-red-500 block">{errors.name.message}</span>
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
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
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
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input"
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
          className="w-full border py-2 px-3 focus:outline-none focus:border-blue-500 input h-[150px] resize-none"
          required
        />
        {errors.desc && (
          <span className="text-red-500 ">{errors.desc.message}</span>
        )}
      </div>
      <GreenButton size="big">Відправити</GreenButton>
    </form>
  );
};

export { FormFeedback };
