"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Icon from "@/app/icon";

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <button onClick={changeTheme}>
      {theme === "light" ? <Icon.Sun /> : <Icon.Moon />}
    </button>
  );
}