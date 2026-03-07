import React from "react";
import { AnimatePresence } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` });
  setHeadComponents([
    <link
      rel="prefetch"
      href="/fonts/Primary.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="interFont"
    />,
    <link
      rel="prefetch"
      href="/fonts/Secondary.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="interFont"
    />,
  ]);
};

// Wraps every page with AnimatePresence for page transitions
export const wrapPageElement = ({ element, props }) => {
  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(element, { ...props, key: props.path })}
    </AnimatePresence>
  );
};
