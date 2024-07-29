import dynamic from "next/dynamic";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const NoSSR = ({ children }: Props) => (
  <React.Fragment>{children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
