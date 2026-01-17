import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href="/" className={style.logo}>
              <Image
                src="/icons/logo.png"
                alt=""
                width={71}
                height={40}
                priority
                className={style.logoIcon}
              />

              <Image
                src="/icons/logoText.png"
                alt=""
                width={151}
                height={40}
                priority
                className={style.logoText}
              />
            </Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
