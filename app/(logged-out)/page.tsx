import { Button } from "@/components/ui/button";
import { PersonStanding } from "lucide-react";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <h1 className="flex justify-center items-center gap-2">
        <PersonStanding color="hsl(var(--primary))" size={50} /> SupportMe
      </h1>
      The best dashboard to manage customer support
      <div className="flex justify-center items-center gap-2">
        <Button>
          <Link href="/login">SIGN IN</Link>
        </Button>{" "}
        <span>or</span>{" "}
        <Button variant="outline">
          <Link href="/signup">SIGN UP</Link>
        </Button>
      </div>
    </>
  );
};

export default LandingPage;
