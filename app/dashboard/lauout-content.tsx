"use client";
import { useMediaQuery } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Banner from "./components/banner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MainMenu from "./components/main-menu";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon, XIcon } from "lucide-react";

type Props = {
    children: React.ReactNode;
  };

const LayoutContent = ({ children }: Props) => {
  const pathname = usePathname();

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="md:grid md:grid-cols-[250px_1fr] h-screen">
      <MainMenu className="hidden md:flex" />
      {!isDesktop && (
        <div className="p-4 flex justify-between  sticky top-0 left-0 bg-background border-b border-border">
          <Banner />
          <Drawer
            direction="right"
            open={mobileMenuOpen}
            onClose={() => {
              setMobileMenuOpen(false);
            }}
            onOpenChange={(open) => setMobileMenuOpen(open)}
          >
            <DrawerTrigger>
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex justify-between p-4">
                <Banner />
                <XIcon size={25} onClick={() => setMobileMenuOpen(false)} />
              </div>
              <MainMenu />
            </DrawerContent>
          </Drawer>
        </div>
      )}
      <div className="overflow-auto py-2 px-4">
        <h1 className="pb-4">Welcome back, William!</h1>
        {children}
      </div>
    </div>
  );
};

export default LayoutContent;
