import * as React from "react";
import Banner from "./components/banner";
import Link from "next/link";
import { ro } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import MainMenu from "./components/main-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MenuIcon, XIcon } from "lucide-react";
import LayoutContent from "./lauout-content";

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = ({ children }: Props) => {
  return (
    <>
      <LayoutContent> {children}</LayoutContent>
    </>
  );
};

export default DashBoardLayout;
