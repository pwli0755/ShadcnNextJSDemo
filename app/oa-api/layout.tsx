"use client";

import * as React from "react";
import Link from "next/link";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { PersonStanding } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const OaApiLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="fixed top-2 right-20 z-50">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>OA接口</NavigationMenuTrigger>
              <NavigationMenuContent >
                <Link href="/oa-api/gen-certificates">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} >
                    OA批量生成许可证
                  </NavigationMenuLink>
                </Link>
                <Link href="/oa-api">
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(),"w-full justify-start")}>
                    OA通用
                  </NavigationMenuLink>
                </Link>
               
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <main className="min-h-screen flex items-center justify-center flex-col p-24 gap-4">
        {children}
        <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2"></LightDarkToggle>
      </main>
    </>
  );
};

export default OaApiLayout;
