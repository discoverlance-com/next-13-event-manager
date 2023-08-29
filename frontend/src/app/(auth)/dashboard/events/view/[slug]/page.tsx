export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="p-4">
      <h1>Edit/View Event Page with Param {params.slug}</h1>
    </div>
  );
}
