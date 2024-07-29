import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { PersonStanding } from "lucide-react";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const LoggedOutLayout = ({ children }: Props) => {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center flex-col p-24 gap-4">
        {children}
        <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2"></LightDarkToggle>
      </main>
      
    </>
  );
};

export default LoggedOutLayout;
