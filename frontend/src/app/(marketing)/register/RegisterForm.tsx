"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { useState } from "react";

import AppTextInput from "~/components/AppTextInput";
import { registerAction } from "~/app/(marketing)/register/actions";
import AppButton from "~/components/AppButton";
import { getFormFieldError } from "~/utils/form";
import { cn } from "~/lib/utils";

const RegisterForm = () => {
  const { pending } = useFormStatus();
  const [formErrors, setFormErrors] =
    useState<Zod.ZodError["formErrors"]["fieldErrors"]>();

  const [formStatus, setFormStatus] = useState("");

  async function onRegister(formData: FormData) {
    const result = await registerAction(formData);

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
      <form action={onRegister} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <AppTextInput
            name="name"
            label="Full name"
            type="text"
            required
            error={getFormFieldError("name", formErrors)}
          />
        </div>

        <div className="col-span-6">
          <AppTextInput
            name="email"
            type="email"
            label="Email"
            required
            error={getFormFieldError("email", formErrors)}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <AppTextInput
            name="password"
            type="password"
            label="Password"
            minLength={8}
            maxLength={64}
            required
            error={getFormFieldError("password", formErrors)}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <AppTextInput
            name="password_confirmation"
            type="password"
            label="Confirm Password"
            minLength={8}
            maxLength={64}
            required
            error={getFormFieldError("password_confirmation", formErrors)}
          />
        </div>

        <div className="col-span-6">
          <AppButton type="submit" disabled={pending} loading={pending}>
            {pending ? "Registering..." : "Register"}
          </AppButton>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
