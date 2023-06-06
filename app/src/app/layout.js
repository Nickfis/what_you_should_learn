import Header from "./components/Header";
import Head from "next/head";
import "./../styling/styles.scss";

export const metadata = {
  title: "MIT Courses Ranked",
  description:
    "All courses from MIT Opencourseware that had video lectures easily accessibel ranked by popularity and stickiness.",
  icons: {
    icon: "/favicon.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
