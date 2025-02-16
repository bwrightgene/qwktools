"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Fingerprint,
  Scaling,
  Image,
  Quote,
  List,
  Pilcrow,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
  iconColor: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Fingerprint className="h-5 w-5" />,
    label: "ID Generator",
    value: "id-generator",
    gradient:
      "radial-gradient(circle, rgba(15,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%)",
    iconColor: "text-blue-500",
  },
  {
    icon: <Scaling className="h-5 w-5" />,
    label: "Aspect Ratio",
    value: "aspect-ratio",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%)",
    iconColor: "text-orange-500",
  },
  {
    icon: <Image className="h-5 w-5" />,
    label: "Image Modifier",
    value: "image-modifier",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%)",
    iconColor: "text-green-500",
  },
  {
    icon: <List className="h-5 w-5" />,
    label: "List Ordering",
    value: "list-ordering",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%)",
    iconColor: "text-red-500",
  },
  {
    icon: <Quote className="h-5 w-5" />,
    label: "Delimiter",
    value: "delimiter",
    gradient:
      "radial-gradient(circle, rgba(220,200,10,0.15) 0%, rgba(220,200,10,0.06) 50%)",
    iconColor: "text-yellow-500",
  },
  {
    icon: <Pilcrow className="h-5 w-5" />,
    label: "Lorem Ipsum",
    value: "lorem-ipsum",
    gradient:
      "radial-gradient(circle, rgba(249,125,189,0.15) 0%, rgba(249,125,189,0.06) 50%)",
    iconColor: "text-pink-500",
  },
];

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export function MenuBar({
  setSelectedTool,
}: {
  setSelectedTool: (tool: string) => void;
}) {
  const { theme } = useTheme();
  const [activeTool, setActiveTool] = useState<string>("id-generator");
  const isDarkTheme = theme === "dark";

  const handleSelectTool = (tool: string) => {
    setActiveTool(tool);
    setSelectedTool(tool);
  };

  return (
    <div className="w-full">
      <div className="block sm:hidden w-full px-4">
        <label className="text-sm font-medium">Select Tool</label>
        <Select value={activeTool} onValueChange={handleSelectTool}>
          <SelectTrigger>
            <SelectValue placeholder="Select a tool" />
          </SelectTrigger>
          <SelectContent>
            {menuItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <motion.nav
        className="hidden sm:block p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
        initial="initial"
        whileHover="hover"
      >
        <motion.div
          className={`absolute -inset-2 bg-gradient-radial from-transparent ${
            isDarkTheme
              ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
              : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
          } to-transparent rounded-3xl z-0 pointer-events-none`}
          variants={navGlowVariants}
        />
        <ul className="flex items-center gap-2 relative z-10">
          {menuItems.map((item) => (
            <motion.li key={item.label} className="relative">
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: activeTool === item.value ? 1 : 0,
                    borderRadius: "16px",
                  }}
                />
                <motion.button
                  onClick={() => handleSelectTool(item.value)}
                  className={`flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl ${
                    activeTool === item.value
                      ? "text-foreground font-bold"
                      : "text-muted-foreground"
                  }`}
                  variants={itemVariants}
                  transition={sharedTransition}
                >
                  <span
                    className={`transition-colors duration-300 ${item.iconColor}`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.button>
                <motion.button
                  onClick={() => handleSelectTool(item.value)}
                  className="absolute inset-0 flex items-center gap-2 px-4 py-2 bg-transparent transition-colors rounded-xl"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                  }}
                >
                  <span
                    className={`transition-colors duration-300 ${item.iconColor}`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.button>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}
