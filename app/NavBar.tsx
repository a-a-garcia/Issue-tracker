import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai"

const NavBar = () => {
  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard"
    },
    {
      name: "Issues",
      href: "/issues"
    }
  ]

  return (
    <nav>
      <ul className="flex space-x-6 h-16 border-b items-center px-5 mb-5">
        <li><AiFillBug /></li>
        {navLinks.map((link) => {
          return <Link href={link.href}><li className='text-slate-400 hover:text-black transition-colors'>{link.name}</li></Link>
        })}
      </ul>
    </nav>
  )
}

export default NavBar