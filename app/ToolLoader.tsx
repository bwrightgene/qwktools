"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MenuBar } from "./components/menu-bar";

const NotFoundComponent = () => <p>Tool not found.</p>;
NotFoundComponent.displayName = "NotFoundComponent";

export default function ToolLoader() {
  const [selectedTool, setSelectedTool] = useState<string | null>(
    "id-generator"
  );

  const ToolComponent = selectedTool
    ? dynamic(
        () =>
          import(`./components/${selectedTool}`)
            .then((mod) => {
              mod.default.displayName = `${selectedTool} Component`;
              return mod;
            })
            .catch(() => NotFoundComponent),
        { ssr: false }
      )
    : null;

  return (
    <div className="w-full min-h-full flex flex-col items-center">
      <div className="fixed top-5 z-50 bg-background shadow-lg">
        <MenuBar setSelectedTool={setSelectedTool} />
      </div>

      <div className="w-full flex flex-col items-center mt-[72px] p-4">
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <p>Select a tool to get started.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
