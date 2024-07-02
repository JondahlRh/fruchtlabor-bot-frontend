import clsx from "clsx";
import { useState } from "react";

type Option = {
  _id: string;
  name: string;
};

type Props = {
  label?: string;
  smallLabel?: boolean;
  changeHandler: (value: Option) => void;
  defaultOption: Option;
  options: Option[];
};

const DEFAULT_INPUT_STYLES = "flex w-full rounded-md bg-neutral-700 p-1";

export default function Select(props: Props) {
  const [value, setValue] = useState<string>(props.defaultOption.name);
  const [options, setOptions] = useState(props.options);
  const [showOptions, setShowOptions] = useState(false);

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    const newOptions = props.options.filter((option) =>
      option.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (newOptions.length === 0) {
      setOptions([{ _id: "null", name: "Keine Option gefunden" }]);
      return;
    }

    setOptions(newOptions);
  };

  const selectNewOption = (option: Option) => {
    setValue(option.name);
    props.changeHandler(option);

    setShowOptions(false);
  };

  const listClasses = clsx("absolute w-full overflow-y-auto h-32", {
    hidden: !showOptions,
  });

  return (
    <div className="flex flex-col gap-1">
      {props.label && (
        <label
          className={clsx("font-bold", {
            "text-sm": props.smallLabel,
            "text-lg": !props.smallLabel,
          })}
        >
          {props.label}
        </label>
      )}

      <div className="relative">
        <input
          className={DEFAULT_INPUT_STYLES}
          value={value}
          onChange={inputOnChange}
          onFocus={() => setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 100)}
        />
        <ul className={listClasses}>
          {options.map((option) => (
            <li
              key={option._id}
              onClick={() => selectNewOption(option)}
              className="cursor-pointer border border-neutral-500 bg-neutral-600 p-1 last:rounded-b-md hover:bg-neutral-500"
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
