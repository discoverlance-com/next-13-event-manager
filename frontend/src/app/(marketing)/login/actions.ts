"use server";

import { AxiosError } from "axios";
import { z } from "zod";
import { apiRoutes } from "~/lib/api";
import axios from "~/lib/axios";
import { setApiTokenCookie } from "~/utils/cookies";
import { getUserDeviceIdentifier } from "~/utils/headers";

const loginSchema = z.object({
  email: z.string().email("Email must be a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function loginAction(formData: FormData) {
  try {
    const parsed = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // register
    const response = await axios.post(apiRoutes.login, {
      ...parsed,
      token_name: getUserDeviceIdentifier(),
    });

    // set the cookies from the response
    setApiTokenCookie(response.data.token);
    return { success: true, message: "You have been successfully logged in." };
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
        message: "Login Error: " + response.message,
      };
    }

    console.error(error);

    return {
      success: false,
      message:
        "Unknown error occured whilst loggin in. Pleast try again later.",
    };
  }
}
