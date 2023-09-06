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
import { revalidateTag } from "next/cache";

type Props = {
  data?: EventData;
};

const EventForm = ({ data }: Props) => {
  const { pending } = useFormStatus();
  const [formErrors, setFormErrors] =
    useState<Zod.ZodError["formErrors"]["fieldErrors"]>();
  const [formStatus, setFormStatus] = useState("");

  async function onUpsert(formData: FormData) {
    const result = await upsertEventAction(formData);

    if (result.success) {
      revalidateTag("events");
      revalidateTag("myEvents");
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
          required
          error={getFormFieldError("title", formErrors)}
        />
        <AppTextInput
          name="start_at"
          label="Start at"
          type="datetime-local"
          required
          error={getFormFieldError("start_at", formErrors)}
        />
        <AppTextInput
          name="end_at"
          label="End at"
          type="datetime-local"
          required
          error={getFormFieldError("end_at", formErrors)}
        />

        <AppTextInput
          name="tags"
          label="Tags"
          type="text"
          helperText="Separate each tag with a comma, example: food,music"
          error={getFormFieldError("tags", formErrors)}
        />

        <AppTextInput
          name="speakers"
          label="Speakers"
          type="text"
          required
          helperText="Separate each speaker with a comma, example: John,Sarah"
          error={getFormFieldError("speakers", formErrors)}
        />

        <AppSelectInput
          label="Status"
          name="status"
          required
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
