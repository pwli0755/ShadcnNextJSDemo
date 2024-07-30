import { PersonStanding, PersonStandingIcon } from "lucide-react";
import React from "react";

const Banner = () => {
  return (
    <h4 className="flex justify-start items-center">
      <PersonStandingIcon size={40} color="hsl(var(--primary))" />
      SupportMe
    </h4>
  );
};

export default Banner;
