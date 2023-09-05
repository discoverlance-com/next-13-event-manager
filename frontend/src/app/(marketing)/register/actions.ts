"use server";

import { AxiosError } from "axios";
import { z } from "zod";

import { apiRoutes } from "~/lib/api";
import axios from "~/lib/axios";
import { setApiTokenCookie } from "~/utils/cookies";
import { getUserDeviceIdentifier } from "~/utils/headers";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email must be a valid email address"),
    password: z
      .string()
      .min(8, "Password must have a minimum of 8 characters")
      .max(64, "Password should not be more than 64 characters"),
    password_confirmation: z
      .string()
      .min(8, "Password Confirmation must have a minimum of 8 characters")
      .max(64, "Password Confirmation should not be more than 64 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

async function registerAction(formData: FormData) {
  try {
    const parsed = registerSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
    });

    // register
    const response = await axios.post(apiRoutes.register, {
      ...parsed,
      token_name: getUserDeviceIdentifier(),
    });

    // set the cookies from the response
    setApiTokenCookie(response.data.token);
    return { success: true, message: "You have been successfully registered." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation Error",
        fieldErrors: error.formErrors.fieldErrors,
      };
    } else if (error instanceof AxiosError) {
      const response = error.response?.data;

      if (response) {
        if (response.errors) {
          return {
            success: false,
            message: "Validation Error",
            fieldErrors:
              response.errors as Zod.ZodError["formErrors"]["fieldErrors"],
          };
        }
      }
      return {
        success: false,
        message: "Registration Error: " + response.message,
      };
    }

    console.error(error);

    return {
      success: false,
      message:
        "Unknown error occured whilst registering. Pleast try again later.",
    };
  }
}

export { registerAction };
