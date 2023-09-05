export const getFormFieldError = (
  field: string,
  fieldErrors?: Zod.ZodError["formErrors"]["fieldErrors"]
) => {
  if (fieldErrors) {
    const errors = fieldErrors[field];
    if (errors !== undefined) {
      return errors[0];
    }
  }

  return undefined;
};
