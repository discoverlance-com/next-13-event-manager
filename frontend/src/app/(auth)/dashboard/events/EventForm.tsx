"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { useState } from "react";

import AppButton from "~/components/AppButton";
import AppSelectInput from "~/components/AppSelectInput";
import AppTextAreaInput from "~/components/AppTextAreaInput";
import AppTextInput from "~/components/AppTextInput";
import { upsertEventAction } from "./actions";
import { cn } from "~/lib/utils";
import { getFormFieldError } from "~/utils/form";
import { revalidatePath } from "next/cache";
import { format, parseISO } from "date-fns";

type Props = {
  data?: EventData;
};

const EventForm = ({ data }: Props) => {
  const { pending } = useFormStatus();
  const [formErrors, setFormErrors] =
    useState<Zod.ZodError["formErrors"]["fieldErrors"]>();
  const [formStatus, setFormStatus] = useState("");

  async function onUpsert(formData: FormData) {
    const result = await upsertEventAction(formData, data?.slug);

    if (result.success) {
      revalidatePath("/");
      revalidatePath("/dashboard/events");
      redirect("/dashboard/events");
    } else {
      setFormErrors(result.fieldErrors);
      setFormStatus(result.message);
    }
  }
  return (
    <div>
      <ul
        className={cn("list-disc transition-opacity bg-slate-200 px-4 mb-2", {
          "block opacity-100": formStatus.length > 0,
          "hidden opacity-0": formStatus.length <= 0,
        })}
      >
        <li className=" text-sm py-2 ml-3">{formStatus}</li>
      </ul>
      <form action={onUpsert}>
        <AppTextInput
          name="title"
          label="Title"
          type="text"
          defaultValue={data?.title}
          required
          error={getFormFieldError("title", formErrors)}
        />
        <AppTextInput
          name="start_at"
          label="Start at"
          type="datetime-local"
          defaultValue={
            data?.start_at &&
            format(parseISO(data?.start_at), "yyyy-MM-dd'T'HH:mm")
          }
          required
          error={getFormFieldError("start_at", formErrors)}
        />
        <AppTextInput
          name="end_at"
          label="End at"
          type="datetime-local"
          defaultValue={
            data?.end_at && format(parseISO(data?.end_at), "yyyy-MM-dd'T'HH:mm")
          }
          required
          error={getFormFieldError("end_at", formErrors)}
        />

        <AppTextInput
          name="tags"
          label="Tags"
          type="text"
          helperText="Separate each tag with a comma, example: food,music"
          defaultValue={data?.tags?.join(",")}
          error={getFormFieldError("tags", formErrors)}
        />

        <AppTextInput
          name="speakers"
          label="Speakers"
          type="text"
          required
          helperText="Separate each speaker with a comma, example: John,Sarah"
          defaultValue={data?.speakers?.join(",")}
          error={getFormFieldError("speakers", formErrors)}
        />

        <AppSelectInput
          label="Status"
          name="status"
          required
          defaultValue={data?.status}
          error={getFormFieldError("status", formErrors)}
        >
          <option value="draft">Draft</option>
          <option value="publish">Publish</option>
          <option value="archive">Archive</option>
        </AppSelectInput>

        <AppTextAreaInput
          label="Description"
          name="description"
          rows={5}
          defaultValue={data?.description}
          error={getFormFieldError("description", formErrors)}
        />

        <div className="mt-6">
          <AppButton type="submit" disabled={pending} loading={pending}>
            Save
          </AppButton>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
