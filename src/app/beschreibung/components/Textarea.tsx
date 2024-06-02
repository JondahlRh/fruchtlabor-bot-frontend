import clsx from "clsx";

type Props = {
  placeholder: string;
  rows: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea(props: Props) {
  return (
    <textarea
      placeholder={props.placeholder}
      className={clsx("flex w-full rounded-md bg-neutral-700 p-1", {
        "min-h-20": props.rows > 2,
        "min-h-16": props.rows === 2,
        "resize-none": props.rows === 1,
      })}
      rows={props.rows}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
