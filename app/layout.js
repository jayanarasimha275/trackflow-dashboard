import "./globals.css";

export const metadata = {
  title: "TrackFlow",
  description: "Link Tracking Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}