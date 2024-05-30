import clsx from "clsx";

type SimplePageProps<T> = {
  title: string;
  rows: 1 | 2 | 3 | 4;
  data: T[];
  children: (item: T, index: number) => React.ReactNode;
};
export default <T extends { _id: string }>(props: SimplePageProps<T>) => {
  const gridClasses = clsx("grid gap-4", {
    "grid-cols-1": props.rows === 1,
    "grid-cols-2": props.rows === 2,
    "grid-cols-3": props.rows === 3,
    "grid-cols-4": props.rows === 4,
  });

  return (
    <main className="mx-auto max-w-screen-xl p-4">
      <div className="flex flex-col gap-8">
        <h2>{props.title}</h2>

        <div className={gridClasses}>
          {props.data.map((x, i) => (
            <div
              key={x._id}
              className="flex flex-col gap-4 rounded-lg bg-neutral-800 px-8 py-4 hover:bg-neutral-700"
            >
              {props.children(x, i)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
