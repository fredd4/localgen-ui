interface InteractiveRangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  setValue: (value: number) => void;
}
const InteractiveRangeSlider = ({ min, max, step, value, setValue }: Readonly<InteractiveRangeSliderProps>) => {
  const generateLabels = () => {
    const labels = [];
    for (let i = min; i <= max; i += step) {
      labels.push(i);
    }
    return labels;
  };

  const labels = generateLabels();

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <input 
          type="range" 
          value={value} 
          min={min}
          max={max}
          step={step} 
          onChange={(e) => setValue(parseInt((e.target as HTMLInputElement).value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        
        <div className="flex justify-between mt-2 px-1">
          {labels.map((label) => (
            <span 
              key={label} 
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export { InteractiveRangeSlider };
