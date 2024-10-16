import Header from "./_components/Header";
import "@/app/_styles/globals.css"

import { Josefin_Sans } from 'next/font/google';
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: 'swap'
})

export const metadata = {
  title: {
    template: "%s / Himalayan Home stay",
    default: "Himalayan Home stay",
    description: "Welcome to the hotel located in the deep mountains of Himalayan in India"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased flex flex-col bg-primary-900 text-primary-50 min-h-screen`}>
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
              {children}
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
