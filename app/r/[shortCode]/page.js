export default async function RedirectPage({ params }) {
  return <pre>{JSON.stringify(await params, null, 2)}</pre>;
}
