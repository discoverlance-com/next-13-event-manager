export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Edit Event Page with Param {params.slug}</h1>
    </div>
  );
}
