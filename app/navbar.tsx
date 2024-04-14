import Link from "next/link";
import Icon from "@/app/icon";
import ThemeButton from "@/app/themeButton";

export default function Navbar() {
  return (
    <div id="navbar">
      <Icon.Logo />
      <div id="nav-list">
        <Link href="/about">About</Link>
        <Link href="/projects">Project</Link>
        <Link href="/blog">Blog</Link>
      </div>
      <ThemeButton />
    </div>
  );
}
