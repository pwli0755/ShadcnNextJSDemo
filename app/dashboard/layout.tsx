"use client";
import * as React from "react";
import Banner from "./components/banner";
import Link from "next/link";
import { ro } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import MainMenu from "./components/main-menu";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon, XIcon } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="md:grid md:grid-cols-[250px_1fr] h-screen">
        <MainMenu className="hidden md:flex" />
        {!isDesktop && (
          <div className="flex p-4 justify-between sticky top-0 left-0">
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
                  <Banner/>
                  <XIcon size={25} onClick={()=>setMobileMenuOpen(false)}/>
                </div>
                <MainMenu />
              </DrawerContent>
            </Drawer>
          </div>
        )}
        <div className="overflow-auto py-2 px-4">
          <h1 className="pb-4">Welcome back, Tom!</h1>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
