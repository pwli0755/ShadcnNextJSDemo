import { DrawerContext } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { isatty } from "tty";

const MenuItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  const {onClose} = useContext(DrawerContext)
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className={cn(
          "block p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground hover:text-foreground",
          isActive &&
            "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground"
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export default MenuItem;
