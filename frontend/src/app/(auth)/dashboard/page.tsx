import { requireUser } from "~/lib/auth";

export default async function Page() {
  await requireUser();

  return (
    <div>
      <h1 className="font-bold text-3xl">Dashboard</h1>
    </div>
  );
}
