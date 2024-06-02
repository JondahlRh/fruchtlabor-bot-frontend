import type { SectionWithID } from "./Form";
import LinkSection from "./LinkSection";

type Props = {
  title: string;
  addTitle: string;
  sections: SectionWithID[];
  addSection: () => void;
  updateSection: (id: number, newSection: SectionWithID) => void;
  removeSection: (id: number) => void;
};

export default function SectionArea(props: Props) {
  const addSectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.addSection();
  };

  return (
    <div className="flex flex-col gap-2">
      <p>{props.title}</p>

      {props.sections.map((section) => (
        <LinkSection
          key={section.id}
          id={section.id}
          title={section.title}
          link={section.link}
          updateSection={props.updateSection}
          removeSection={props.removeSection}
        />
      ))}

      <button
        className="w-full rounded-lg bg-secondary p-1 font-bold text-neutral-900 hover:bg-opacity-75"
        onClick={addSectionHandler}
      >
        {props.addTitle}
      </button>
    </div>
  );
}
