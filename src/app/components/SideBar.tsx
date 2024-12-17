import Link from 'next/link'
import { FaWallet, FaUser, FaChartLine, FaCog } from 'react-icons/fa'
import { AiOutlineLogout } from 'react-icons/ai'
import { GrBitcoin } from 'react-icons/gr'
const menuItems = [
  {
    icon: FaWallet,
    title: 'Wallet',
    href: '/wallet',
  },
  {
    icon: FaUser,
    title: 'Account',
    href: '/account',
  },
  {
    icon: FaChartLine,
    title: 'Chart',
    href: '/chart',
  },
  {
    icon: FaCog,
    title: 'Settings',
    href: '/settings',
  },
]
const Sidebar = () => {
  return (
    <div className="h-full min-h-screen w-[300px] bg-background text-[#ECEAE7] flex flex-col justify-between p-5">
      {/* Logo */}
      <div className="mb-8 w-12 justify-center bg-[#262626] items-center rounded-full flex h-12">
        <img className="w-1/3" src="/logo.svg" alt="" />
      </div>

      {/* Menu Items */}
      <nav className="space-y-4 h-96">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center space-x-3 hover:bg-[#262626] hover:text-[#FFFFFF] rounded-md py-4 px-8 opacity-30 hover:opacity-100"
          >
            <item.icon className="text-lg group-hover:text-[#F0D85A]" />
            <span className="text-lg">{item.title}</span>
          </Link>
        ))}
      </nav>
      {/* Logout */}
      <div>
        <Link
          href="/logout"
          className="group flex items-center space-x-3 hover:text-white-400 rounded-md py-4 px-8 opacity-30 hover:opacity-100"
        >
          <AiOutlineLogout className="text-xl group-hover:text-[#F0D85A]" />
          <span className="text-lg">Log out</span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
