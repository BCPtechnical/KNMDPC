import React from "react";
import { AnimatePresence } from "framer-motion";

// Wraps every page with AnimatePresence for page transitions
export const wrapPageElement = ({ element, props }) => {
  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(element, { ...props, key: props.path })}
    </AnimatePresence>
  );
};