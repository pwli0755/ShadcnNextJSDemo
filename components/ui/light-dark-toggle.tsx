"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

type Props = {
  className?: string;
};

export const LightDarkToggle = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={className}
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          <div>{theme === "dark" ? <MoonIcon /> : <SunIcon />}</div>
        </TooltipTrigger>
        <TooltipContent arrowPadding={10}>
          {theme === "dark" ? "Enable light mode" : "Enable dark mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
