import "./globals.css";

export const metadata = {
  title: "Auth App",
  description: "Login and Register",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
