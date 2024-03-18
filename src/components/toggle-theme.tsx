"use client";
import React from 'react';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from './ui/button';

const ToggleTheme = () => {
  const { setTheme, theme } = useTheme();

  const onToggle = () => {
    switch(theme) {
      case "light": {
        setTheme("dark");
        break;
      } 
      case "dark": {
        setTheme("light");
        break;
      }
      default: {
        setTheme("light");
      }
    }
  };

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={onToggle}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
    </div>
  );
}

export default ToggleTheme;