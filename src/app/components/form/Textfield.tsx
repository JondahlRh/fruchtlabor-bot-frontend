import clsx from "clsx";

type Props = {
  label?: string;
  smallLabel?: boolean;
  placeholder: string;

  rows: number;

  value: string;
  changeHandler: (value: string) => void;
};

const DEFAULT_INPUT_STYLES = "flex w-full rounded-md bg-neutral-700 p-1";

export default function Textfield(props: Props) {
  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    props.changeHandler(e.target.value);
  };

  const textareaClasses = clsx(DEFAULT_INPUT_STYLES, {
    "min-h-20": props.rows > 2,
    "min-h-16": props.rows === 2,
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

      {props.rows === 1 && (
        <input
          className={DEFAULT_INPUT_STYLES}
          placeholder={props.placeholder}
          value={props.value}
          onChange={inputChangeHandler}
        />
      )}

      {props.rows > 1 && (
        <textarea
          className={textareaClasses}
          placeholder={props.placeholder}
          rows={props.rows}
          value={props.value}
          onChange={inputChangeHandler}
        />
      )}
    </div>
  );
}
