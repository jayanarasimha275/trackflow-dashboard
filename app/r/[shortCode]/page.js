import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/r/${params.shortCode}`,
    {
      redirect: "manual",
      cache: "no-store",
    },
  );

  return (
    <pre>
      {JSON.stringify(
        {
          status: response.status,
          ok: response.ok,
          redirected: response.redirected,
          url: response.url,
        },
        null,
        2,
      )}
    </pre>
  );
}
