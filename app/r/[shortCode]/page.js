import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/r/${params.shortCode}`,
    {
      redirect: "manual",
    },
  );

  console.log(response);

  return <div>Loading...</div>;
}
