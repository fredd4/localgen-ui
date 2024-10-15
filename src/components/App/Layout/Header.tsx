import Settings from "@/components/App/Settings/Settings";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { Settings2Icon } from "lucide-react";

const Header = () => (
  <header className="mb-8">
    <div className="flex items-center justify-between">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="bg-clip-text text-5xl font-bold">DALL-E Web App</span>
      </motion.h1>
      <div className="ml-4 flex items-center justify-center">
        <Popover modal>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="border-border bg-secondary text-secondary-foreground hover:bg-muted focus:ring-ring disabled:bg-muted disabled:text-muted-foreground"
            >
              <Settings2Icon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-96"
            side="left"
            style={{ boxShadow: "0 0 0 12000px rgba(0, 0, 0, 0.32)" }}
            collisionPadding={{ top: 32 }}
          >
            <Settings />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </header>
);

export default Header;
