import { cn } from "@/lib/utils";
import React from "react";
import Banner from "./banner";
import MenuItem from "./menu-item";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const menus: { lable: string; route: string }[] = [
  {
    lable: "My dashboard",
    route: "/dashboard",
  },
  {
    lable: "Teams",
    route: "/dashboard/teams",
  },
  {
    lable: "Employees",
    route: "/dashboard/employees",
  },
  {
    lable: "Account",
    route: "/dashboard/account",
  },
  {
    lable: "Settings",
    route: "/dashboard/settings",
  },
];

const MainMenu = ({ className }: { className?: string }) => {
    
  return (
    <nav
      className={cn("md:bg-muted overflow-auto p-4 flex flex-col", className)}
    >
      <header className="hidden md:block border-b dark:border-b-black border-b-zinc-300 pb-4">
        <Banner />
      </header>
      <ul className="py-4 grow">
        {menus.map((menu) => (
          <MenuItem href={menu.route} key={menu.route}>
            {menu.lable}
          </MenuItem>
        ))}
      </ul>
      <footer className="flex gap-2 items-center">
        <Avatar >
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800">WL</AvatarFallback>
        </Avatar>
        <Link href="/" className="hover:underline">Logout</Link>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
};

export default MainMenu;
