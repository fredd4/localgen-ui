import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { useState } from 'react';

const QuantitySelector = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 530px)");
  const [quantity, setQuantity] = useState(2);
  const increment = () => setQuantity(prev => Math.min(prev + 1, 6));
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className={`flex items-stretch border border-input rounded-lg overflow-hidden ${isSmallDevice && "hidden"}`}>
      <div className="flex flex-col items-center justify-center min-w-[64px]">
        <div className="text-xs text-muted-foreground">Quantity</div>
        <div className="text-xl font-bold -mt-1">{quantity}</div>
      </div>
      <div className="flex flex-col border-l border-input">
        <button
          onClick={increment}
          className="flex-1 flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Increase quantity"
        >
          <ChevronUp size={18} />
        </button>
        <button
          onClick={decrement}
          className="flex-1 flex items-center justify-center hover:bg-accent transition-colors border-t border-input"
          aria-label="Decrease quantity"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </div>
  );
};

const ActionRow = () => {
  const [useExactPrompt, setUseExactPrompt] = useState(false);

  return (
    <div className="flex items-stretch space-x-2 p-2 rounded-lg shadow-md w-full h-16">
      <QuantitySelector />

      <Button className="h-full bg-primary text-primary-foreground hover:bg-primary/90 flex-grow flex items-center justify-center">
        Generate
        <span className="ml-2 font-mono text-sm opacity-80">$0.04</span>
      </Button>

      <Button
        variant={useExactPrompt ? 'default' : 'outline'}
        onClick={() => setUseExactPrompt(!useExactPrompt)}
        className={`flex flex-col items-center justify-center h-full w-24 p-1 px-2 ${
          useExactPrompt ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'
        }`}
        style={{flexShrink: 0 }}
      >
        <span
          className={`text-base ${useExactPrompt ? 'font-bold' : 'font-semibold'}`}
        >
          {useExactPrompt ? 'ON' : 'OFF'}
        </span>
        <span className="text-xs mt-1">Exact Prompt</span>
      </Button>

      <Button variant="outline" className="relative aspect-square h-full p-0 flex-shrink-0" onClick={toggleGenerationOption}>
        <ImageSettingsIcon />
      </Button>
    </div>
  );
};

export default ActionRow;
