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
      <div className="mb-4">
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => setValue(parseInt((e.target as HTMLInputElement).value))}
          className="
          w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-800
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-zinc-800
          [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer
        "
        />

        <div className="flex justify-between px-1">
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
