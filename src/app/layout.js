import "./globals.css";

export const metadata = {
  title: "TalentFlow Learning Platform",
  description: "Next.js frontend architecture for the TalentFlow LMS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
