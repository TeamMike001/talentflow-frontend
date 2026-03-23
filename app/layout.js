import './globals.css';

export const metadata = {
  title: 'TalentFlow - Learn Smarter',
  description: 'All your learning, assignments, and progress in one place.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-gray-100 text-gray-900 antialiased">
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-lg relative">
          {children}
        </div>
      </body>
    </html>
  );
}