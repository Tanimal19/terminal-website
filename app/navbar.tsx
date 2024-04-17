import Link from "next/link";
import Icon from "@/app/icon";
import ThemeButton from "@/app/themeButton";

export default function Navbar() {
  return (
    <div
      id="navbar"
      className="font-sans flex flex-row items-center justify-between px-4 py-3 border-b-2 border-complementary dark:border-complementaryDark"
    >
      <a href="/">
        <Icon size="size-8" name="logo" />
      </a>
      <div
        id="nav-list"
        className="flex gap-20 items-center text-xl font-medium"
      >
        <Linker href="/" children="Home" />
        <Linker href="/about" children="About" />
        <Linker href="/blog" children="Blog" />
      </div>
      <ThemeButton />
    </div>
  );
}

function Linker(LinkerProps: { href: string; children: string }) {
  return (
    <Link
      href={LinkerProps.href}
      className="relative inline before:bg-accent-300 before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
    >
      {LinkerProps.children}
    </Link>
  );
}
