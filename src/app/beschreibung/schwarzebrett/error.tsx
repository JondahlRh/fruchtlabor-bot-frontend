"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: Props) {
  console.log("An error occurred", props.error);

  return (
    <div className="m-64 flex flex-col items-center gap-2">
      <h2 className="text-2xl font-bold">Etwas ist felgeschlagen!</h2>
      <button
        className="rounded bg-primary px-4 py-2 font-bold text-neutral-900 hover:bg-opacity-75"
        onClick={props.reset}
      >
        Erneut versuchen...
      </button>
    </div>
  );
}
