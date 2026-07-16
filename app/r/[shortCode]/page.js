import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  const { shortCode } = await params;

  redirect(`${process.env.NEXT_PUBLIC_REDIRECT_API_URL}/r/${shortCode}`);
}
