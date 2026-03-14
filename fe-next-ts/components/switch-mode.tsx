"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function SwitchMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleMode() {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.classList.toggle("dark");
    setIsDarkMode(html.classList.contains("dark"));
  }

  return (
    <Button variant={"outline"} onClick={toggleMode}>
      {isDarkMode ? <Moon /> : <Sun />}
    </Button>
  );
}
