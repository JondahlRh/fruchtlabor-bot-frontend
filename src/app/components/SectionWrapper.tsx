type Props = {
  title: string;
  children: React.ReactNode;
};

export default function SectionWrapper(props: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-2xl font-bold">{props.title}</p>
      <div className="flex flex-col gap-2 rounded-md border border-neutral-500 p-4">
        {props.children}
      </div>
    </div>
  );
}
