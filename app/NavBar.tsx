'use client'
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai"
import classnames from 'classnames'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const currentPath = usePathname()

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
          return <Link
            key={link.href} 
            href={link.href}
            className={classnames({
                'text-zinc-900' : link.href === currentPath,
                'text-zinc-300' : link.href !== currentPath,
                'hover:text-zinc-800 transition-colors' : true
              })
            }>{link.name}
            </Link>
        })}
      </ul>
    </nav>
  )
}

export default NavBar