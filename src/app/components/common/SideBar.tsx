'use client'

import Link from 'next/link'
import { FaWallet, FaUser, FaChartLine, FaCog } from 'react-icons/fa'
import { AiOutlineLogout } from 'react-icons/ai'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
const menuItems = [
  {
    icon: FaWallet,
    title: 'Wallet',
    href: '/wallet',
  },
  {
    icon: FaUser,
    title: 'Ethereum Price',
    href: '/price',
  },
  // {
  //   icon: FaChartLine,
  //   title: 'Chart',
  //   href: '/chart',
  // },
  // {
  //   icon: FaCog,
  //   title: 'Settings',
  //   href: '/settings',
  // },
]
const Sidebar = () => {
  const pathname = usePathname()
  useEffect(() => {
    setSelectedItem(pathname)
  }, [pathname])
  const [selectedItem, setSelectedItem] = useState<string>('')

  return (
    <div className="h-full min-h-screen w-[300px] bg-background text-[#ECEAE7] flex flex-col justify-between p-5">
      {/* Logo */}
      <div className="mb-8 w-12 justify-center bg-[#262626] items-center rounded-full flex h-12">
        <Image
          className="w-1/3"
          width={40}
          height={40}
          src="/logo.svg"
          alt=""
        />
      </div>

      {/* Menu Items */}
      <nav className="space-y-4 h-96">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSelectedItem(item.href)}
            className={`group flex items-center space-x-3 rounded-md py-4 px-8 hover:opacity-100 ${
              selectedItem === item.href
                ? 'bg-[#262626] text-[#FFFFFF] opacity-100'
                : 'hover:bg-[#262626] hover:text-[#FFFFFF]'
            }`}
          >
            <item.icon
              className={`text-lg ${
                selectedItem === item.href
                  ? 'text-[#F0D85A]'
                  : 'text-[#FFFFFF] group-hover:text-[#F0D85A]'
              }`}
            />
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
