// example: http://localhost:3000/product-detail/a
// nextjs.org/docs/app/building-your-application/routing/dynamic-routes

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <div>My Post: {slug}</div>;
}
