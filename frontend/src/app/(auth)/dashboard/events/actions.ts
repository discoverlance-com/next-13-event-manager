"use server";

import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { z } from "zod";

import { apiRoutes } from "~/lib/api";
import axios from "~/lib/axios";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const eventSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    start_at: z.string().min(1, "Start at is required"),
    end_at: z.string().min(1, "End at is required"),
    status: z.enum(["publish", "archive", "draft"]),
    speakers: z
      .string()
      .transform((data) => (data.length > 0 ? data.split(",") : data)),
    tags: z
      .string()
      .transform((data) => (data.length > 0 ? data.split(",") : data))
      .nullable(),
    image: z
      .any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      )
      .nullable(),
    description: z.string(),
  })
  .refine((data) => new Date(data.start_at) < new Date(data.end_at), {
    message: "End at must be after the start date",
    path: ["end_at"],
  });

export async function upsertEventAction(formData: FormData, slug = "") {
  try {
    const parsed = eventSchema.parse({
      title: formData.get("title"),
      start_at: formData.get("start_at"),
      end_at: formData.get("end_at"),
      status: formData.get("status"),
      speakers: formData.get("speakers"),
      tags: formData.get("tags"),
      image: formData.get("image"),
      description: formData.get("description"),
    });

    const apiToken = cookies().get("apiToken")?.value;

    if (slug && slug.length > 0) {
      await axios.put(apiRoutes.auth.events.edit(slug), parsed, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          // "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.post(apiRoutes.auth.events.create, parsed, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    return { success: true, message: "Event updated" };
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
        message: "Event Creation Error: " + response.message,
      };
    }

    console.error(error);

    return {
      success: false,
      message:
        "Unknown error occured whilst updating event. Pleast try again later.",
    };
  }
}
