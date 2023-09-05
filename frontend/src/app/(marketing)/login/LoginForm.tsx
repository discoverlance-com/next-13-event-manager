"use client";

import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import AppButton from "~/components/AppButton";
import AppTextInput from "~/components/AppTextInput";
import { cn } from "~/lib/utils";
import { loginAction } from "./actions";
import { redirect } from "next/navigation";
import { getFormFieldError } from "~/utils/form";

const LoginForm = () => {
  const { pending } = useFormStatus();
  const [formErrors, setFormErrors] =
    useState<Zod.ZodError["formErrors"]["fieldErrors"]>();
  const [formStatus, setFormStatus] = useState("");

  async function onLogin(formData: FormData) {
    const result = await loginAction(formData);

    if (result.success !== true) {
      setFormErrors(result.fieldErrors);
      setFormStatus(result.message);
    } else {
      // go to dashboard
      redirect("/dashboard");
    }
  }
  return (
    <>
      <ul
        className={cn("list-disc transition-opacity bg-slate-200 px-4", {
          "block opacity-100": formStatus.length > 0,
          "hidden opacity-0": formStatus.length <= 0,
        })}
      >
        <li className=" text-sm py-2 ml-3">{formStatus}</li>
      </ul>
      <form action={onLogin} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <AppTextInput
            name="email"
            label="Email"
            type="email"
            required
            error={getFormFieldError("email", formErrors)}
          />
        </div>

        <div className="col-span-6">
          <AppTextInput
            name="password"
            label="Password"
            type="password"
            required
            error={getFormFieldError("password", formErrors)}
          />
        </div>

        <div className="col-span-6">
          <AppButton type="submit" disabled={pending} loading={pending}>
            {pending ? "Please wait..." : "Login"}
          </AppButton>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
