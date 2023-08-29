import AppButton from "~/components/AppButton";
import AppSelectInput from "~/components/AppSelectInput";
import AppTextAreaInput from "~/components/AppTextAreaInput";
import AppTextInput from "~/components/AppTextInput";

type Props = {
  data?: EventData;
};

const EventForm = ({ data }: Props) => {
  return (
    <div>
      <form method="POST">
        <AppTextInput name="title" label="Title" type="text" required />
        <AppTextInput
          name="start_at"
          label="Start at"
          type="datetime-local"
          required
        />
        <AppTextInput
          name="end_at"
          label="End at"
          type="datetime-local"
          required
        />

        <AppTextInput
          name="tags"
          label="Tags"
          type="text"
          helperText="Separate each tag with a comma, example: food,music"
        />

        <AppTextInput
          name="speakers"
          label="Speakers"
          type="text"
          required
          helperText="Separate each speaker with a comma, example: John,Sarah"
        />

        <AppSelectInput label="Status" name="status" required>
          <option value="draft">Draft</option>
          <option value="publish">Publish</option>
          <option value="archive">Archive</option>
        </AppSelectInput>

        <AppTextAreaInput label="Description" name="description" rows={5} />

        <div className="mt-6">
          <AppButton type="submit">Save</AppButton>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
