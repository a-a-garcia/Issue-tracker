'use client'
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai"
import classnames from 'classnames'
import { usePathname } from 'next/navigation'
import { Box } from '@radix-ui/themes'
import { useSession } from 'next-auth/react';

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname()

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard"
    },
    
    {
      name: "Issues",
      href: "/issues/list"
    }
  ]

  return (
    <nav className="flex space-x-6 h-16 border-b items-center px-5 mb-5">
      <ul className="flex space-x-6">
        <AiFillBug />
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-300': link.href !== currentPath,
                'hover:text-zinc-800 transition-colors': true,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && <Link href="/api/auth/signout">Log Out</Link>}
        {status === "unauthenticated" && <Link href="/api/auth/signin">Log In</Link>}
      </Box>
    </nav>
  )
}

export default NavBar