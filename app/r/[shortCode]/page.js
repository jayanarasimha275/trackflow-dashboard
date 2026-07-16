import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  const { shortCode } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_REDIRECT_API_URL}/r/${shortCode}`,
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
          url: response.url,
        },
        null,
        2,
      )}
    </pre>
  );
}
