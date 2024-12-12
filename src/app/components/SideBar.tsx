import Link from 'next/link'
import {
  FaWallet,
  FaUser,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="h-full min-h-screen w-[300px] bg-background text-[#ECEAE7] flex flex-col justify-between p-5">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">MyLogo</h1>
      </div>

      {/* Menu Items */}
      <nav className="space-y-4 h-96">
        <Link
          href="/"
          className="flex items-center space-x-3 hover:bg-[#262626] hover:text-[#FFFFFF] rounded-md py-4 px-8"
        >
          <FaWallet className="text-lg" />
          <span>Wallet</span>
        </Link>
        <Link
          href="/account"
          className="flex items-center space-x-3 hover:bg-[#262626] hover:text-[#FFFFFF] rounded-md py-4 px-8"
        >
          <FaUser className="text-lg" />
          <span>Account</span>
        </Link>
        <Link
          href="/chart"
          className="flex items-center space-x-3 hover:bg-[#262626] hover:text-[#FFFFFF] rounded-md py-4 px-8"
        >
          <FaChartLine className="text-lg" />
          <span>Chart</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center space-x-3 hover:bg-[#262626] hover:text-[#FFFFFF] rounded-md py-4 px-8"
        >
          <FaCog className="text-lg" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Logout */}
      <div>
        <Link
          href="/logout"
          className="flex items-center space-x-3 text-red-500 hover:text-red-400"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
