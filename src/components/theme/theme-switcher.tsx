"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon">
      <LucideSun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <LucideMoon className="absolute h-4 w-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};

export { ThemeSwitcher };
