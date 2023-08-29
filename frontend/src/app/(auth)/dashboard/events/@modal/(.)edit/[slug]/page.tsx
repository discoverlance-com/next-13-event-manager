import AppModal from "~/components/AppModal";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <AppModal>
      <div>
        <h1>Edit/View Event Page with Param {params.slug}</h1>
      </div>
    </AppModal>
  );
}
