"use client";
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { Avatar, Box, Container, Flex, DropdownMenu } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  return (
    <nav className="py-3 border-b px-5 mb-5">
      {/* wrapping everything in a Container here will align the content of our navbar with our page contents */}
      <Container>
        <Flex justify={"between"}>
          <Flex align="center" gap="3">
            <NavigationLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavigationLinks = () => {
  const currentPath = usePathname();

  const navLinks = [
    {
      name: "Dashboard",
      href: "/",
    },

    {
      name: "Issues",
      href: "/issues/list",
    },
  ];

  return (
  <ul className="flex space-x-6">
    <Link href="/">
      <AiFillBug />
    </Link>
    {navLinks.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className={classnames({
            "nav-link": true,
            // the `!` before the string is equivalent to important! - makes sure 
            "!text-zinc-900": link.href === currentPath,
          })}
        >
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return <Link className="nav-link" href="/api/auth/signin">Login</Link>;
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout
            ">Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
