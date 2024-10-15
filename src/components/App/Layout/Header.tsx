import Settings from "@/components/App/Settings/Settings";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { motion } from "framer-motion";
import { Settings2Icon } from "lucide-react";

const Header = () => {
  const isSmallScreen = useMediaQuery("(max-width: 525px)");
  const buttonStyle =
    "flex flex-col justify-between py-1 sm:py-2 h-10 w-10 sm:h-16 sm:w-16";
  const buttonLabelStyle = "text-xs hidden sm:block";

  const SettingsButton = () => (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className={buttonStyle}>
          <Settings2Icon size={32} />
          <span className={buttonLabelStyle}>Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 rounded-xl border bg-card text-card-foreground shadow"
        side={isSmallScreen ? "bottom" : "left"}
        style={{ boxShadow: "0 0 0 12000px rgba(0, 0, 0, 0.32)" }}
        collisionPadding={isSmallScreen ? { right: 16 } : { top: 32 }}
      >
        <Settings />
      </PopoverContent>
    </Popover>
  );

  return (
    <header className="mb-4">
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xl font-bold sm:text-5xl">DALL-E Web App</span>
        </motion.h1>
        <div className="flex items-end justify-center space-x-2 sm:space-x-4">
          <SettingsButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
