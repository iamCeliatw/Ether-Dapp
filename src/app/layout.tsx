import './globals.css'
import Sidebar from './components/common/SideBar'
import Navbar from './components/common/NavBar'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-4">{children}</div>
        </main>
      </body>
    </html>
  )
}
